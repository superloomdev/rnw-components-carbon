// Info: Carbon-informed component library for the RNW pipeline.
//
// Class I standalone module. Atoms and molecules over the themer, with
// theme-driven responsiveness and a real accessibility contract. React
// is injected as Lib.React; react-native is a direct peer dependency
// and imported normally. Platform and viewport are treated differently:
// Platform is a constant read from react-native; viewport is a live
// subscription from the injected Lib.Device (js-rnw-helper-device).
//
// Provides: build, rebuild, themeContract, useBreakpoint.
//
// Factory pattern: each loader call returns an independent instance with
// its own registry state. Re-theming calls rebuild and returns a new
// registry object; the previous registry is never mutated.
//
// Compatibility: React Native Web (web, iOS, Android). Requires the RNW
// runtime. Node.js for testing with injected stubs.
'use strict';


/////////////////////////// Module-Loader START ////////////////////////////////

/********************************************************************
Factory loader. One call = one independent instance with its own
registry, styles, and injected dependencies.

@param {Object} shared_libs - Lib container; requires React, Utils,
                              Debug, Device; optional Icons
@param {Object} config      - Overrides merged over defaults

@return {Object} - Public Components interface
*********************************************************************/
module.exports = function loader (shared_libs, config) {

  // Dependencies for this instance - by reference from the shared container
  const Lib = {
    Utils: shared_libs.Utils,
    Debug: shared_libs.Debug,
    React: shared_libs.React,
    Device: shared_libs.Device,
    Icons: shared_libs.Icons
  };

  // Merge overrides over defaults
  const CONFIG = Object.assign(
    {},
    require('./components.config'),
    config || {}
  );

  // Own frozen error catalog
  const ERRORS = require('./components.errors');

  // Load the validators singleton and inject Lib + ERRORS
  const Validators = require('./components.validators')(Lib, ERRORS);

  // Validate config - throws on misconfiguration
  Validators.validateConfig(CONFIG);

  // Validate required injections - throws on missing dependency
  Validators.validateInjections(shared_libs);

  // Mutable per-instance state: the built registry and styles, rebuilt on re-theme
  // Contexts are created once per loader call, NOT inside build, so a rebuild
  // does not orphan mounted Consumers (Plan 0100 M7)
  const state = {
    registry: null,
    styles: null,
    breakpoint: 'base',
    contexts: {
      // Compound contexts created once per loader instance
      // Populated lazily by compound components on first build
    }
  };

  return createInterface(Lib, CONFIG, ERRORS, Validators, state);

};///////////////////////////// Module-Loader END ///////////////////////////////


/////////////////////////// createInterface START //////////////////////////////

/********************************************************************
Builds the public interface for one instance. Public and private
functions close over the provided Lib, CONFIG, ERRORS, Validators,
and state.

@param {Object} Lib       - Dependency container
@param {Object} CONFIG    - Merged configuration for this instance
@param {Object} ERRORS    - Frozen error catalog
@param {Object} Validators - Validators singleton
@param {Object} state     - Mutable state holder

@return {Object} - Public interface for this module
*********************************************************************/
const createInterface = function (Lib, CONFIG, ERRORS, Validators, state) {

  ///////////////////////////Public Functions START//////////////////////////////
  const Components = {


    // ~~~~~~~~~~~~~~~~~~~~ Registry Build ~~~~~~~~~~~~~~~~~~~~

    /********************************************************************
    Build the themed component registry from a theme contract. Generates
    utility styles per breakpoint, wires the HOC, and instantiates every
    atom, molecule, variant, and freeform component.

    @param {Object} theme       - Theme contract { Color, Dimension, Font, Breakpoint }
    @param {String} breakpoint  - Active breakpoint key (default 'base')

    @return {Object} - { Component, Style }
    *********************************************************************/
    build: function (theme, breakpoint) {

      // Validate the theme contract at boot time - throws on malformed theme
      Validators.validateTheme(theme);

      // Resolve the active breakpoint, defaulting to 'base'
      const activeBreakpoint = breakpoint || 'base';

      // Mechanism parts - built once per instance, injected into every component
      // factory. Parts are internal; they are never exported through the public
      // interface. See module-structure.md, Parts Pattern.
      const STYLE_CONTRACT = require('./data/style-contract.json');
      const partsConfig = Object.assign({}, CONFIG, { STYLE_CONTRACT: STYLE_CONTRACT });

      const Parts = {
        A11y:             require('./parts/a11y')(Lib, partsConfig, ERRORS),
        PressKeys:        require('./parts/press-keys')(Lib, partsConfig, ERRORS),
        RovingTabIndex:   require('./parts/roving-tab-index')(Lib, partsConfig, ERRORS),
        ControllableState: require('./parts/controllable-state')(Lib, partsConfig, ERRORS),
        AnchoredPosition: require('./parts/anchored-position')(Lib, partsConfig, ERRORS),
        FocusTrap:        require('./parts/focus-trap')(Lib, partsConfig, ERRORS),
        Overlay:          require('./parts/overlay')(Lib, partsConfig, ERRORS),
        CompoundContext:  require('./parts/compound-context')(Lib, partsConfig, ERRORS),
        Units:            require('./parts/units')(Lib, partsConfig, ERRORS),
        Typeface:         require('./parts/typeface')(Lib, partsConfig, ERRORS)
      };

      // Generate utility styles for every breakpoint, memoized by key
      const generateStyles = require('./component/commonStyles');
      const allStyles = {};
      const breakpointKeys = Object.keys(theme.Breakpoint);

      // Generate the utility set for each breakpoint
      for (let i = 0; i < breakpointKeys.length; i++) {
        const bpKey = breakpointKeys[i];

        // Skip non-numeric breakpoint entries
        if (!Lib.Utils.isNumber(theme.Breakpoint[bpKey])) {
          continue;
        }

        // Generate and cache the utility set for this breakpoint
        allStyles[bpKey] = generateStyles(theme, bpKey, Parts);

      }

      // Build the Style slot consumed by every component factory
      const Style = {
        utilities: allStyles[activeBreakpoint] || allStyles['base'],
        tokens: theme,
        breakpoint: activeBreakpoint,
        allBreakpoints: allStyles
      };

      // The shared component registry (molecules close over this object)
      const Component = {};

      // Helper: instantiate a factory with the full injection set
      // Lib is first, matching every other Superloom module
      const make = function (factory) {
        return factory(Lib, CONFIG, ERRORS, Parts, Component, Style);
      };

      // ~~~~~~~~~~ Atoms ~~~~~~~~~~
      Component.View = make(require('./component/atom/view'));
      Component.Text = make(require('./component/atom/text'));
      Component.Icon = make(require('./component/atom/icon'));
      Component.Image = make(require('./component/atom/image'));
      // Badge and Separator deleted in P3: not Carbon exports.
      // Carbon uses Tag and contextual dividers (MenuItemDivider, etc.) instead.
      Component.ProgressBar = make(require('./component/atom/progressBar'));
      Component.Button = make(require('./component/atom/button'));
      Component.TextInput = make(require('./component/atom/textInput'));
      Component.Toggle = make(require('./component/atom/toggle'));
      Component.Checkbox = make(require('./component/atom/checkbox'));
      Component.RadioButton = make(require('./component/atom/radioButton'));
      Component.TextArea = make(require('./component/atom/textArea'));
      Component.Slider = make(require('./component/atom/slider'));
      Component.Link = make(require('./component/atom/link'));
      Component.Skeleton = make(require('./component/atom/skeleton'));
      Component.Loading = make(require('./component/atom/loading'));
      Component.Tag = make(require('./component/atom/tag'));
      Component.AspectRatio = make(require('./component/atom/aspectRatio'));
      Component.Heading = make(require('./component/atom/heading'));
      Component.BadgeIndicator = make(require('./component/atom/badgeIndicator'));
      Component.ShapeIndicator = make(require('./component/atom/shapeIndicator'));
      Component.IconIndicator = make(require('./component/atom/iconIndicator'));

      // ~~~~~~~~~~ Molecules (canonical) ~~~~~~~~~~
      // ButtonPrimary, ButtonLink, Card deleted in P3: not Carbon exports.
      // Button kind="primary"|"ghost" replaces ButtonPrimary/ButtonLink.
      // Tile replaces Card.
      Component.ListItem = make(require('./component/molecule/listItem'));
      Component.Dropdown = make(require('./component/molecule/dropdown'));
      Component.Modal = make(require('./component/molecule/modal'));
      Component.Search = make(require('./component/molecule/search'));
      Component.PasswordInput = make(require('./component/molecule/passwordInput'));
      Component.NumberInput = make(require('./component/molecule/numberInput'));
      Component.ExpandableSearch = make(require('./component/molecule/expandableSearch'));
      Component.FormLabel = make(require('./component/molecule/formLabel'));
      Component.FormItem = make(require('./component/molecule/formItem'));
      Component.Stack = make(require('./component/molecule/stack'));
      Component.ButtonSet = make(require('./component/molecule/buttonSet'));
      Component.IconButton = make(require('./component/molecule/iconButton'));
      Component.CopyButton = make(require('./component/molecule/copyButton'));
      Component.UserAvatar = make(require('./component/molecule/userAvatar'));
      Component.TruncatedText = make(require('./component/molecule/truncatedText'));
      Component.CodeSnippet = make(require('./component/molecule/codeSnippet'));
      Component.InlineLoading = make(require('./component/molecule/inlineLoading'));
      Component.Tile = make(require('./component/molecule/tile'));
      Component.ClickableTile = make(require('./component/molecule/clickableTile'));
      Component.SelectableTile = make(require('./component/molecule/selectableTile'));

      // ~~~~~~~~~~ Molecules (Wave 5 overlays) ~~~~~~~~~~
      Component.MenuItem = make(require('./component/molecule/menuItem'));
      Component.MenuItemSelectable = make(require('./component/molecule/menuItemSelectable'));
      Component.MenuItemDivider = make(require('./component/molecule/menuItemDivider'));
      Component.ModalHeader = make(require('./component/molecule/modalHeader'));
      Component.ModalBody = make(require('./component/molecule/modalBody'));
      Component.ModalFooter = make(require('./component/molecule/modalFooter'));
      Component.Popover = make(require('./component/molecule/popover'));
      Component.Tooltip = make(require('./component/molecule/tooltip'));
      Component.DefinitionTooltip = make(require('./component/molecule/definitionTooltip'));
      Component.Toggletip = make(require('./component/molecule/toggletip'));

      // ~~~~~~~~~~ Composites (Wave 5 overlays) ~~~~~~~~~~
      // Composites are multi-part components that use M7 (createCompoundContext)
      // for parent-child coordination. They register as flat keys, same as
      // atoms and molecules.
      Component.Menu = make(require('./component/composite/menu'));
      Component.OverflowMenu = make(require('./component/composite/overflowMenu'));
      Component.MenuButton = make(require('./component/composite/menuButton'));
      Component.ComboButton = make(require('./component/composite/comboButton'));
      Component.ComposedModal = make(require('./component/composite/composedModal'));
      Component.MenuItemRadioGroup = make(require('./component/composite/menuItemRadioGroup'));
      Component.SidePanel = make(require('./component/composite/sidePanel'));
      Component.AILabel = make(require('./component/composite/aiLabel'));
      Component.ActionSheet = make(require('./component/composite/actionSheet'));

      // ~~~~~~~~~~ Molecules (Wave 6 navigation) ~~~~~~~~~~
      Component.Tab = make(require('./component/molecule/tab'));
      Component.TabList = make(require('./component/molecule/tabList'));
      Component.TabPanel = make(require('./component/molecule/tabPanel'));
      Component.AccordionItem = make(require('./component/molecule/accordionItem'));
      Component.BreadcrumbItem = make(require('./component/molecule/breadcrumbItem'));
      Component.Switch = make(require('./component/molecule/switch'));
      Component.PaginationNav = make(require('./component/molecule/paginationNav'));
      Component.TreeNode = make(require('./component/molecule/treeNode'));
      Component.ProgressStep = make(require('./component/molecule/progressStep'));
      Component.HeaderNavigation = make(require('./component/molecule/headerNavigation'));
      Component.HeaderMenuButton = make(require('./component/molecule/headerMenuButton'));
      Component.HeaderPanel = make(require('./component/molecule/headerPanel'));

      // ~~~~~~~~~~ Composites (Wave 6 navigation) ~~~~~~~~~~
      Component.Tabs = make(require('./component/composite/tabs'));
      Component.Accordion = make(require('./component/composite/accordion'));
      Component.Breadcrumb = make(require('./component/composite/breadcrumb'));
      Component.ContentSwitcher = make(require('./component/composite/contentSwitcher'));
      Component.Pagination = make(require('./component/composite/pagination'));
      Component.TreeView = make(require('./component/composite/treeView'));
      Component.ProgressIndicator = make(require('./component/composite/progressIndicator'));
      Component.Header = make(require('./component/composite/header'));

      // ~~~~~~~~~~ Molecules (Wave 8 feedback) ~~~~~~~~~~
      Component.Notification = make(require('./component/molecule/notification'));
      Component.ToastNotification = make(require('./component/molecule/toastNotification'));
      Component.TableBatchActions = make(require('./component/molecule/tableBatchActions'));
      Component.TableBatchAction = make(require('./component/molecule/tableBatchAction'));
      Component.StaticNotification = make(require('./component/molecule/staticNotification'));
      Component.Callout = make(require('./component/molecule/callout'));

      // ~~~~~~~~~~ Molecules (Wave 9 data and layout) ~~~~~~~~~~
      Component.DataTable = make(require('./component/molecule/dataTable'));
      Component.TableRow = make(require('./component/molecule/tableRow'));
      Component.TableCell = make(require('./component/molecule/tableCell'));
      Component.TableHeader = make(require('./component/molecule/tableHeader'));
      Component.TableBody = make(require('./component/molecule/tableBody'));
      Component.TableHead = make(require('./component/molecule/tableHead'));
      Component.Grid = make(require('./component/molecule/grid'));
      Component.Row = make(require('./component/molecule/row'));
      Component.Column = make(require('./component/molecule/column'));
      Component.FlexGrid = make(require('./component/molecule/flexGrid'));
      Component.TableContainer = make(require('./component/molecule/tableContainer'));
      // LayerMolecule deleted in P3: duplicate of provider.Layer.
      Component.Form = make(require('./component/molecule/form'));
      // Fieldset and Legend deleted in P3: internal parts of FormGroup.
      Component.OrderedList = make(require('./component/molecule/orderedList'));
      Component.UnorderedList = make(require('./component/molecule/unorderedList'));
      Component.ContainedListItem = make(require('./component/molecule/containedListItem'));
      Component.StructuredListWrapper = make(require('./component/molecule/structuredListWrapper'));
      Component.StructuredListRow = make(require('./component/molecule/structuredListRow'));
      Component.StructuredListCell = make(require('./component/molecule/structuredListCell'));
      Component.TableToolbar = make(require('./component/molecule/tableToolbar'));
      // Divider deleted in P3: duplicate of Separator, which is also deleted.
      // ScrollGradient deleted in P3: not in either Carbon package.

      // ~~~~~~~~~~ Composites (Wave 9 data and layout) ~~~~~~~~~~
      Component.DataTableRow = make(require('./component/composite/dataTableRow'));
      // PaginationBar deleted in P3: duplicate of Pagination.
      Component.ToggletipLabel = make(require('./component/composite/toggletipLabel'));
      // GridItem deleted in P3: duplicate of Column.

      // ~~~~~~~~~~ P4.1 RN-only components ~~~~~~~~~~
      Component.InlineLink = make(require('./component/atom/inlineLink'));
      Component.ErrorState = make(require('./component/molecule/errorState'));
      Component.LandingView = make(require('./component/molecule/landingView'));
      Component.List = make(require('./component/molecule/list'));
      Component.NavigationList = make(require('./component/molecule/navigationList'));
      Component.NavigationListItem = make(require('./component/molecule/navigationListItem'));
      Component.WebHeader = make(require('./component/molecule/webHeader'));
      Component.ViewWrapper = make(require('./component/molecule/viewWrapper'));
      Component.SafeAreaWrapper = make(require('./component/molecule/safeAreaWrapper'));
      Component.GrantPermission = make(require('./component/molecule/grantPermission'));
      Component.BottomNavigationBar = make(require('./component/molecule/bottomNavigationBar'));
      Component.BottomToolbar = make(require('./component/molecule/bottomToolbar'));
      Component.BottomToolbarPrimaryAction = make(require('./component/molecule/bottomToolbarPrimaryAction'));
      Component.BottomSafeAreaColorOverride = make(require('./component/molecule/bottomSafeAreaColorOverride'));
      Component.DocumentViewer = make(require('./component/molecule/documentViewer'));
      Component.TopNavigationBar = make(require('./component/molecule/topNavigationBar'));
      Component.TopNavigationBarLogin = make(require('./component/molecule/topNavigationBarLogin'));
      Component.UiPanel = make(require('./component/molecule/uiPanel'));
      Component.UiPanelItem = make(require('./component/molecule/uiPanelItem'));
      Component.AcceptTerms = make(require('./component/composite/acceptTerms'));

      // ~~~~~~~~~~ P4.2 Table family ~~~~~~~~~~
      Component.Table = make(require('./component/molecule/table'));
      Component.DataTableCell = make(require('./component/molecule/dataTableCell'));
      Component.DataTableHeader = make(require('./component/molecule/dataTableHeader'));
      Component.DataTableHeaderSelected = make(require('./component/molecule/dataTableHeaderSelected'));
      Component.TableActionList = make(require('./component/molecule/tableActionList'));
      Component.TableDecoratorRow = make(require('./component/molecule/tableDecoratorRow'));
      Component.TableExpandHeader = make(require('./component/molecule/tableExpandHeader'));
      Component.TableExpandRow = make(require('./component/molecule/tableExpandRow'));
      Component.TableExpandedRow = make(require('./component/molecule/tableExpandedRow'));
      Component.TableSelectAll = make(require('./component/molecule/tableSelectAll'));
      Component.TableSelectRow = make(require('./component/molecule/tableSelectRow'));
      Component.TableSlugRow = make(require('./component/molecule/tableSlugRow'));
      Component.TableToolbarAction = make(require('./component/molecule/tableToolbarAction'));
      Component.TableToolbarContent = make(require('./component/molecule/tableToolbarContent'));
      Component.TableToolbarMenu = make(require('./component/molecule/tableToolbarMenu'));
      Component.TableToolbarSearch = make(require('./component/molecule/tableToolbarSearch'));

      // ~~~~~~~~~~ P4.3 Form composites and selects ~~~~~~~~~~
      Component.ControlledPasswordInput = make(require('./component/molecule/controlledPasswordInput'));
      Component.DatePickerInput = make(require('./component/molecule/datePickerInput'));
      Component.ErrorBoundaryContext = make(require('./component/molecule/errorBoundaryContext'));
      Component.FilterableMultiSelect = make(require('./component/composite/filterableMultiSelect'));
      Component.FormContext = make(require('./component/molecule/formContext'));
      Component.PopoverContent = make(require('./component/molecule/popoverContent'));
      Component.PrefixContext = make(require('./component/molecule/prefixContext'));
      Component.SelectItem = make(require('./component/molecule/selectItem'));
      Component.SelectItemGroup = make(require('./component/molecule/selectItemGroup'));
      Component.SelectableTag = make(require('./component/molecule/selectableTag'));
      Component.ThemeContext = make(require('./component/molecule/themeContext'));
      Component.TimePickerSelect = make(require('./component/molecule/timePickerSelect'));
      Component.ToggletipActions = make(require('./component/molecule/toggletipActions'));
      Component.ToggletipButton = make(require('./component/molecule/toggletipButton'));
      Component.ToggletipContent = make(require('./component/molecule/toggletipContent'));

      // ~~~~~~~~~~ P4.4 Notifications and feedback ~~~~~~~~~~
      Component.AILabelActions = make(require('./component/molecule/aILabelActions'));
      Component.AILabelContent = make(require('./component/molecule/aILabelContent'));
      Component.AISkeletonIcon = make(require('./component/molecule/aISkeletonIcon'));
      Component.AISkeletonPlaceholder = make(require('./component/molecule/aISkeletonPlaceholder'));
      Component.AISkeletonText = make(require('./component/molecule/aISkeletonText'));
      Component.ActionableNotification = make(require('./component/molecule/actionableNotification'));
      Component.ColumnHang = make(require('./component/molecule/columnHang'));
      Component.ContainedList = make(require('./component/molecule/containedList'));
      Component.Content = make(require('./component/molecule/content'));
      Component.Copy = make(require('./component/molecule/copy'));
      Component.DismissibleTag = make(require('./component/molecule/dismissibleTag'));
      Component.ExpandableTile = make(require('./component/molecule/expandableTile'));
      Component.GlobalTheme = make(require('./component/molecule/globalTheme'));
      Component.GridSettings = make(require('./component/molecule/gridSettings'));
      Component.HStack = make(require('./component/molecule/hStack'));
      Component.IconSwitch = make(require('./component/molecule/iconSwitch'));
      Component.IconTab = make(require('./component/molecule/iconTab'));
      Component.InlineNotification = make(require('./component/molecule/inlineNotification'));
      Component.MenuItemGroup = make(require('./component/molecule/menuItemGroup'));
      Component.NotificationActionButton = make(require('./component/molecule/notificationActionButton'));
      Component.NotificationButton = make(require('./component/molecule/notificationButton'));
      Component.OperationalTag = make(require('./component/molecule/operationalTag'));
      Component.OverflowMenuItem = make(require('./component/molecule/overflowMenuItem'));
      Component.RadioTile = make(require('./component/molecule/radioTile'));
      Component.Section = make(require('./component/molecule/section'));
      Component.SkeletonIcon = make(require('./component/molecule/skeletonIcon'));
      Component.SkeletonPlaceholder = make(require('./component/molecule/skeletonPlaceholder'));
      Component.SkeletonText = make(require('./component/molecule/skeletonText'));
      Component.SkipToContent = make(require('./component/molecule/skipToContent'));
      Component.VStack = make(require('./component/molecule/vStack'));
      Component.Switcher = make(require('./component/molecule/switcher'));
      Component.SwitcherDivider = make(require('./component/molecule/switcherDivider'));
      Component.SwitcherItem = make(require('./component/molecule/switcherItem'));

      // ~~~~~~~~~~ Composites (Wave 6 form components) ~~~~~~~~~~
      // Form composites use M1 (a11y), M3 (useRovingTabIndex), M4 (Overlay),
      // M5 (useAnchoredPosition), M7 (createCompoundContext), M8 (useControllableState).
      Component.Select = make(require('./component/composite/select'));
      Component.ComboBox = make(require('./component/composite/comboBox'));
      Component.MultiSelect = make(require('./component/composite/multiSelect'));
      Component.RadioButtonGroup = make(require('./component/composite/radioButtonGroup'));
      Component.CheckboxGroup = make(require('./component/composite/checkboxGroup'));
      // SliderInput deleted in P3: Slider has optional paired number input.
      Component.DatePicker = make(require('./component/composite/datePicker'));
      Component.TimePicker = make(require('./component/composite/timePicker'));
      // DateRangePicker deleted in P3: use DatePicker datePickerType="range".
      // NumberInputComposite deleted in P3: duplicate of NumberInput molecule.
      // FileUploader deleted in P3: replaced by FileUploaderItem and DocumentViewer.
      // FluidForm composite deleted in P3: duplicate of provider.FluidForm.
      Component.FormGroup = make(require('./component/composite/formGroup'));
      // ToggleGroup deleted in P3: not in either package. ContentSwitcher is the segmented control.
      // TimeInput deleted in P3: TimePicker is the text field.
      Component.DateInput = make(require('./component/composite/dateInput'));

      // ~~~~~~~~~~ P4.5 FileUploader, Header, SideNav, StructuredList, Tab, Tile ~~~~~~~~~~
      Component.FileUploader = make(require('./component/composite/fileUploader'));
      Component.FileUploaderButton = make(require('./component/molecule/fileUploaderButton'));
      Component.FileUploaderDropContainer = make(require('./component/molecule/fileUploaderDropContainer'));
      Component.FileUploaderItem = make(require('./component/molecule/fileUploaderItem'));
      Component.Filename = make(require('./component/molecule/filename'));
      Component.HeaderContainer = make(require('./component/molecule/headerContainer'));
      Component.HeaderGlobalAction = make(require('./component/molecule/headerGlobalAction'));
      Component.HeaderGlobalBar = make(require('./component/molecule/headerGlobalBar'));
      Component.HeaderMenu = make(require('./component/molecule/headerMenu'));
      Component.HeaderMenuItem = make(require('./component/molecule/headerMenuItem'));
      Component.HeaderName = make(require('./component/molecule/headerName'));
      Component.HeaderSideNavItems = make(require('./component/molecule/headerSideNavItems'));
      Component.SideNav = make(require('./component/molecule/sideNav'));
      Component.SideNavDetails = make(require('./component/molecule/sideNavDetails'));
      Component.SideNavDivider = make(require('./component/molecule/sideNavDivider'));
      Component.SideNavFooter = make(require('./component/molecule/sideNavFooter'));
      Component.SideNavHeader = make(require('./component/molecule/sideNavHeader'));
      Component.SideNavIcon = make(require('./component/molecule/sideNavIcon'));
      Component.SideNavItem = make(require('./component/molecule/sideNavItem'));
      Component.SideNavItems = make(require('./component/molecule/sideNavItems'));
      Component.SideNavLink = make(require('./component/molecule/sideNavLink'));
      Component.SideNavLinkText = make(require('./component/molecule/sideNavLinkText'));
      Component.SideNavMenu = make(require('./component/molecule/sideNavMenu'));
      Component.SideNavMenuItem = make(require('./component/molecule/sideNavMenuItem'));
      Component.SideNavSwitcher = make(require('./component/molecule/sideNavSwitcher'));
      Component.StructuredListBody = make(require('./component/molecule/structuredListBody'));
      Component.StructuredListHead = make(require('./component/molecule/structuredListHead'));
      Component.StructuredListInput = make(require('./component/molecule/structuredListInput'));
      Component.TabContent = make(require('./component/molecule/tabContent'));
      Component.TabListVertical = make(require('./component/molecule/tabListVertical'));
      Component.TabPanels = make(require('./component/molecule/tabPanels'));
      Component.TabsVertical = make(require('./component/composite/tabsVertical'));
      Component.TileAboveTheFoldContent = make(require('./component/molecule/tileAboveTheFoldContent'));
      Component.TileBelowTheFoldContent = make(require('./component/molecule/tileBelowTheFoldContent'));
      Component.TileGroup = make(require('./component/molecule/tileGroup'));

      // ~~~~~~~~~~ Structured exceptions (variant registry) ~~~~~~~~~~
      Component.variant = {
        ButtonPrimaryOutlined: make(require('./component/variant/buttonPrimaryOutlined'))
      };

      // ~~~~~~~~~~ Unstructured exceptions (freeform; NO tokens) ~~~~~~~~~~
      // Freeform factories receive Lib (for React access) but NOT Style or
      // Registry. They cannot read tokens or compose atoms. They take raw
      // styles only and do not retheme.
      Component.freeform = {
        RawBox: require('./component/freeform/rawBox')(Lib)
      };

      // ~~~~~~~~~~ Providers (context-only, no tokens, no visual output) ~~~~~~~~~~
      // Providers register at Component.provider.[name], matching the
      // Component.variant and Component.freeform namespacing. They do not
      // count toward the flat top-level key count.
      const overlayModule = require('./component/Overlay')(Lib);
      const liveRegionModule = require('./component/LiveRegionProvider')(Lib);
      const layerModule = require('./component/provider/layer')(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const themeModule = require('./component/provider/theme')(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const featureFlagsModule = require('./component/provider/featureFlags')(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const idPrefixModule = require('./component/provider/idPrefix')(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const fluidFormModule = require('./component/provider/fluidForm')(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const errorBoundaryModule = require('./component/provider/errorBoundary')(Lib, CONFIG, ERRORS, Parts, Component, Style);
      Component.provider = {
        Overlay: overlayModule.Overlay,
        LiveRegionProvider: liveRegionModule.LiveRegionProvider,
        Layer: layerModule.Layer,
        Theme: themeModule.Theme,
        FeatureFlags: featureFlagsModule.FeatureFlags,
        IdPrefix: idPrefixModule.IdPrefix,
        FluidForm: fluidFormModule.FluidForm,
        ErrorBoundary: errorBoundaryModule.ErrorBoundary
      };

      // Store in state for rebuild reference
      state.registry = Component;
      state.styles = Style;
      state.breakpoint = activeBreakpoint;

      // Return the themed library and its generated styles
      return { Component: Component, Style: Style };

    },


    /********************************************************************
    Rebuild the themed component registry from a new theme. Returns a
    new registry object; the previous registry is never mutated. This
    is the runtime re-theming mechanism.

    @param {Object} theme       - New theme contract
    @param {String} breakpoint  - Active breakpoint key

    @return {Object} - { Component, Style }
    *********************************************************************/
    rebuild: function (theme, breakpoint) {

      // Delegate to build, which validates and constructs a fresh registry
      return Components.build(theme, breakpoint);

    },


    /********************************************************************
    Bridge themer output to the component theme contract. Converts the
    flat emitted token map from buildTheme() into the nested
    { Color, Dimension, Font, Breakpoint } shape the library consumes.

    @param {Object} themer_output - Result from Lib.Themer.buildTheme()

    @return {Object} - { Color, Dimension, Font, Breakpoint }
    *********************************************************************/
    themeContract: function (themer_output) {

      // Delegate to the bridge module
      const bridge = require('./components.theme-contract');
      return bridge(themer_output);

    },


    // ~~~~~~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~

    /********************************************************************
    React hook that resolves the active breakpoint from the injected
    Device helper. Seeds from Device.getViewport() and subscribes to
    viewport changes, unsubscribing on unmount. Returns the active
    breakpoint key.

    @param {Object} theme  - Theme contract with Breakpoint group

    @return {String} - Active breakpoint key ('base', 'sm', 'md', 'lg', 'xl')
    *********************************************************************/
    useBreakpoint: function (theme) {

      // Resolve the active breakpoint from the current viewport width
      const resolveBreakpoint = function (width) {

        // Walk the breakpoint order in descending width to find the match
        const order = CONFIG.BREAKPOINT_ORDER;
        let active = 'base';

        for (let i = order.length - 1; i >= 0; i--) {
          const bpKey = order[i];
          const bpWidth = theme.Breakpoint[bpKey];

          if (Lib.Utils.isNumber(bpWidth) && width >= bpWidth) {
            active = bpKey;
            break;
          }

        }

        return active;

      };

      // Read the current viewport
      const viewportResult = Lib.Device.getViewport();
      const initialWidth = viewportResult.success ? viewportResult.width : 0;

      // State holds the active breakpoint key
      const React = Lib.React;
      const breakpointState = React.useState(resolveBreakpoint(initialWidth));
      const currentBreakpoint = breakpointState[0];
      const setBreakpoint = breakpointState[1];

      // Subscribe to viewport changes
      React.useEffect(function () {

        // Subscribe to viewport changes from the Device helper
        const subResult = Lib.Device.onViewportChange(function (dims) {

          // Resolve the new breakpoint and update state if it changed
          const next = resolveBreakpoint(dims.width);

          if (next !== currentBreakpoint) {
            setBreakpoint(next);
          }

        });

        // Return the cleanup function to unsubscribe on unmount
        return function () {

          if (subResult.success && Lib.Utils.isFunction(subResult.unsubscribe)) {
            subResult.unsubscribe();
          }

        };

      }, [currentBreakpoint]);

      return currentBreakpoint;

    },


    // ~~~~~~~~~~~~~~~~~~~~ Token Constants ~~~~~~~~~~~~~~~~~~~~

    /********************************************************************
    Export the valid token sets as constants so applications reference
    a constant instead of a string literal. This shrinks the error
    surface for render-time prop validation.

    @return {Object} - { fontSize, fontColor, fontWeight, space, radius }
    *********************************************************************/
    tokens: Object.freeze({
      fontSize: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      fontColor: ['text_primary', 'text_secondary', 'text_muted', 'text_on_primary',
        'app_primary', 'status_success', 'status_danger', 'status_warning', 'status_info'],
      fontWeight: ['regular', 'medium', 'semibold', 'bold'],
      space: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      radius: ['sm', 'md', 'lg', 'xl', 'pill']
    })

  };///////////////////////////Public Functions END//////////////////////////////


  return Components;

};/////////////////////////// createInterface END //////////////////////////////
