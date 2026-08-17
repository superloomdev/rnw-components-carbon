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


// Imports
import { createRequire } from 'node:module';

import DEFAULT_CONFIG from './components.config.js';
import ERRORS from './components.errors.js';
import createValidators from './components.validators.js';
import themeContractBridge from './components.theme-contract.js';

// Load the style contract JSON through createRequire; import attributes are
// not supported by the shared ESLint parser at this revision.
const require = createRequire(import.meta.url);
const STYLE_CONTRACT = require('./data/style-contract.json');

// Parts
import partsA11y from './parts/a11y.js';
import partsPressKeys from './parts/press-keys.js';
import partsRovingTabIndex from './parts/roving-tab-index.js';
import partsControllableState from './parts/controllable-state.js';
import partsAnchoredPosition from './parts/anchored-position.js';
import partsFocusTrap from './parts/focus-trap.js';
import partsOverlay from './parts/overlay.js';
import partsCompoundContext from './parts/compound-context.js';
import partsUnits from './parts/units.js';
import partsTypeface from './parts/typeface.js';
import partsDirection from './parts/direction.js';

// Utilities
import generateStyles from './component/commonStyles.js';

// Atoms
import viewFactory from './component/atom/view.js';
import textFactory from './component/atom/text.js';
import iconFactory from './component/atom/icon.js';
import imageFactory from './component/atom/image.js';
import progressBarFactory from './component/atom/progressBar.js';
import buttonFactory from './component/atom/button.js';
import textInputFactory from './component/atom/textInput.js';
import toggleFactory from './component/atom/toggle.js';
import checkboxFactory from './component/atom/checkbox.js';
import radioButtonFactory from './component/atom/radioButton.js';
import textAreaFactory from './component/atom/textArea.js';
import sliderFactory from './component/atom/slider.js';
import linkFactory from './component/atom/link.js';
import skeletonFactory from './component/atom/skeleton.js';
import loadingFactory from './component/atom/loading.js';
import tagFactory from './component/atom/tag.js';
import aspectRatioFactory from './component/atom/aspectRatio.js';
import headingFactory from './component/atom/heading.js';
import badgeIndicatorFactory from './component/atom/badgeIndicator.js';
import shapeIndicatorFactory from './component/atom/shapeIndicator.js';
import iconIndicatorFactory from './component/atom/iconIndicator.js';
import inlineLinkFactory from './component/atom/inlineLink.js';

// Molecules (canonical)
import listItemFactory from './component/molecule/listItem.js';
import dropdownFactory from './component/molecule/dropdown.js';
import modalFactory from './component/molecule/modal.js';
import searchFactory from './component/molecule/search.js';
import passwordInputFactory from './component/molecule/passwordInput.js';
import numberInputFactory from './component/molecule/numberInput.js';
import expandableSearchFactory from './component/molecule/expandableSearch.js';
import formLabelFactory from './component/molecule/formLabel.js';
import formItemFactory from './component/molecule/formItem.js';
import stackFactory from './component/molecule/stack.js';
import buttonSetFactory from './component/molecule/buttonSet.js';
import iconButtonFactory from './component/molecule/iconButton.js';
import copyButtonFactory from './component/molecule/copyButton.js';
import userAvatarFactory from './component/molecule/userAvatar.js';
import truncatedTextFactory from './component/molecule/truncatedText.js';
import codeSnippetFactory from './component/molecule/codeSnippet.js';
import inlineLoadingFactory from './component/molecule/inlineLoading.js';
import tileFactory from './component/molecule/tile.js';
import clickableTileFactory from './component/molecule/clickableTile.js';
import selectableTileFactory from './component/molecule/selectableTile.js';

// Molecules (overlays)
import menuItemFactory from './component/molecule/menuItem.js';
import menuItemSelectableFactory from './component/molecule/menuItemSelectable.js';
import menuItemDividerFactory from './component/molecule/menuItemDivider.js';
import modalHeaderFactory from './component/molecule/modalHeader.js';
import modalBodyFactory from './component/molecule/modalBody.js';
import modalFooterFactory from './component/molecule/modalFooter.js';
import popoverFactory from './component/molecule/popover.js';
import tooltipFactory from './component/molecule/tooltip.js';
import definitionTooltipFactory from './component/molecule/definitionTooltip.js';
import toggletipFactory from './component/molecule/toggletip.js';

// Composites (overlays)
import menuFactory from './component/composite/menu.js';
import overflowMenuFactory from './component/composite/overflowMenu.js';
import menuButtonFactory from './component/composite/menuButton.js';
import comboButtonFactory from './component/composite/comboButton.js';
import composedModalFactory from './component/composite/composedModal.js';
import menuItemRadioGroupFactory from './component/composite/menuItemRadioGroup.js';
import sidePanelFactory from './component/composite/sidePanel.js';
import aiLabelFactory from './component/composite/aiLabel.js';
import actionSheetFactory from './component/composite/actionSheet.js';

// Molecules (navigation)
import tabFactory from './component/molecule/tab.js';
import tabListFactory from './component/molecule/tabList.js';
import tabPanelFactory from './component/molecule/tabPanel.js';
import accordionItemFactory from './component/molecule/accordionItem.js';
import breadcrumbItemFactory from './component/molecule/breadcrumbItem.js';
import switchFactory from './component/molecule/switch.js';
import paginationNavFactory from './component/molecule/paginationNav.js';
import treeNodeFactory from './component/molecule/treeNode.js';
import progressStepFactory from './component/molecule/progressStep.js';
import headerNavigationFactory from './component/molecule/headerNavigation.js';
import headerMenuButtonFactory from './component/molecule/headerMenuButton.js';
import headerPanelFactory from './component/molecule/headerPanel.js';

// Composites (navigation)
import tabsFactory from './component/composite/tabs.js';
import accordionFactory from './component/composite/accordion.js';
import breadcrumbFactory from './component/composite/breadcrumb.js';
import contentSwitcherFactory from './component/composite/contentSwitcher.js';
import paginationFactory from './component/composite/pagination.js';
import treeViewFactory from './component/composite/treeView.js';
import progressIndicatorFactory from './component/composite/progressIndicator.js';
import headerFactory from './component/composite/header.js';

// Molecules (feedback)
import notificationFactory from './component/molecule/notification.js';
import toastNotificationFactory from './component/molecule/toastNotification.js';
import tableBatchActionsFactory from './component/molecule/tableBatchActions.js';
import tableBatchActionFactory from './component/molecule/tableBatchAction.js';
import staticNotificationFactory from './component/molecule/staticNotification.js';
import calloutFactory from './component/molecule/callout.js';

// Molecules (data and layout)
import dataTableFactory from './component/molecule/dataTable.js';
import tableRowFactory from './component/molecule/tableRow.js';
import tableCellFactory from './component/molecule/tableCell.js';
import tableHeaderFactory from './component/molecule/tableHeader.js';
import tableBodyFactory from './component/molecule/tableBody.js';
import tableHeadFactory from './component/molecule/tableHead.js';
import gridFactory from './component/molecule/grid.js';
import rowFactory from './component/molecule/row.js';
import columnFactory from './component/molecule/column.js';
import flexGridFactory from './component/molecule/flexGrid.js';
import tableContainerFactory from './component/molecule/tableContainer.js';
import formFactory from './component/molecule/form.js';
import orderedListFactory from './component/molecule/orderedList.js';
import unorderedListFactory from './component/molecule/unorderedList.js';
import containedListItemFactory from './component/molecule/containedListItem.js';
import structuredListWrapperFactory from './component/molecule/structuredListWrapper.js';
import structuredListRowFactory from './component/molecule/structuredListRow.js';
import structuredListCellFactory from './component/molecule/structuredListCell.js';
import tableToolbarFactory from './component/molecule/tableToolbar.js';

// Composites (data and layout)
import dataTableRowFactory from './component/composite/dataTableRow.js';
import toggletipLabelFactory from './component/composite/toggletipLabel.js';

// Molecules (platform-specific)
import errorStateFactory from './component/molecule/errorState.js';
import landingViewFactory from './component/molecule/landingView.js';
import listFactory from './component/molecule/list.js';
import navigationListFactory from './component/molecule/navigationList.js';
import navigationListItemFactory from './component/molecule/navigationListItem.js';
import webHeaderFactory from './component/molecule/webHeader.js';
import viewWrapperFactory from './component/molecule/viewWrapper.js';
import safeAreaWrapperFactory from './component/molecule/safeAreaWrapper.js';
import grantPermissionFactory from './component/molecule/grantPermission.js';
import bottomNavigationBarFactory from './component/molecule/bottomNavigationBar.js';
import bottomToolbarFactory from './component/molecule/bottomToolbar.js';
import bottomToolbarPrimaryActionFactory from './component/molecule/bottomToolbarPrimaryAction.js';
import bottomSafeAreaColorOverrideFactory from './component/molecule/bottomSafeAreaColorOverride.js';
import documentViewerFactory from './component/molecule/documentViewer.js';
import topNavigationBarFactory from './component/molecule/topNavigationBar.js';
import topNavigationBarLoginFactory from './component/molecule/topNavigationBarLogin.js';
import uiPanelFactory from './component/molecule/uiPanel.js';
import uiPanelItemFactory from './component/molecule/uiPanelItem.js';
import acceptTermsFactory from './component/composite/acceptTerms.js';

// Molecules (table family)
import tableFactory from './component/molecule/table.js';
import dataTableCellFactory from './component/molecule/dataTableCell.js';
import dataTableHeaderFactory from './component/molecule/dataTableHeader.js';
import dataTableHeaderSelectedFactory from './component/molecule/dataTableHeaderSelected.js';
import tableActionListFactory from './component/molecule/tableActionList.js';
import tableDecoratorRowFactory from './component/molecule/tableDecoratorRow.js';
import tableExpandHeaderFactory from './component/molecule/tableExpandHeader.js';
import tableExpandRowFactory from './component/molecule/tableExpandRow.js';
import tableExpandedRowFactory from './component/molecule/tableExpandedRow.js';
import tableSelectAllFactory from './component/molecule/tableSelectAll.js';
import tableSelectRowFactory from './component/molecule/tableSelectRow.js';
import tableSlugRowFactory from './component/molecule/tableSlugRow.js';
import tableToolbarActionFactory from './component/molecule/tableToolbarAction.js';
import tableToolbarContentFactory from './component/molecule/tableToolbarContent.js';
import tableToolbarMenuFactory from './component/molecule/tableToolbarMenu.js';
import tableToolbarSearchFactory from './component/molecule/tableToolbarSearch.js';

// Molecules (form and select)
import controlledPasswordInputFactory from './component/molecule/controlledPasswordInput.js';
import datePickerInputFactory from './component/molecule/datePickerInput.js';
import errorBoundaryContextFactory from './component/molecule/errorBoundaryContext.js';
import filterableMultiSelectFactory from './component/composite/filterableMultiSelect.js';
import formContextFactory from './component/molecule/formContext.js';
import popoverContentFactory from './component/molecule/popoverContent.js';
import prefixContextFactory from './component/molecule/prefixContext.js';
import selectItemFactory from './component/molecule/selectItem.js';
import selectItemGroupFactory from './component/molecule/selectItemGroup.js';
import selectableTagFactory from './component/molecule/selectableTag.js';
import themeContextFactory from './component/molecule/themeContext.js';
import timePickerSelectFactory from './component/molecule/timePickerSelect.js';
import toggletipActionsFactory from './component/molecule/toggletipActions.js';
import toggletipButtonFactory from './component/molecule/toggletipButton.js';
import toggletipContentFactory from './component/molecule/toggletipContent.js';

// Molecules (notifications and utilities)
import aILabelActionsFactory from './component/molecule/aILabelActions.js';
import aILabelContentFactory from './component/molecule/aILabelContent.js';
import aISkeletonIconFactory from './component/molecule/aISkeletonIcon.js';
import aISkeletonPlaceholderFactory from './component/molecule/aISkeletonPlaceholder.js';
import aISkeletonTextFactory from './component/molecule/aISkeletonText.js';
import actionableNotificationFactory from './component/molecule/actionableNotification.js';
import columnHangFactory from './component/molecule/columnHang.js';
import containedListFactory from './component/molecule/containedList.js';
import contentFactory from './component/molecule/content.js';
import copyFactory from './component/molecule/copy.js';
import dismissibleTagFactory from './component/molecule/dismissibleTag.js';
import expandableTileFactory from './component/molecule/expandableTile.js';
import globalThemeFactory from './component/molecule/globalTheme.js';
import gridSettingsFactory from './component/molecule/gridSettings.js';
import hStackFactory from './component/molecule/hStack.js';
import iconSwitchFactory from './component/molecule/iconSwitch.js';
import iconTabFactory from './component/molecule/iconTab.js';
import inlineNotificationFactory from './component/molecule/inlineNotification.js';
import menuItemGroupFactory from './component/molecule/menuItemGroup.js';
import notificationActionButtonFactory from './component/molecule/notificationActionButton.js';
import notificationButtonFactory from './component/molecule/notificationButton.js';
import operationalTagFactory from './component/molecule/operationalTag.js';
import overflowMenuItemFactory from './component/molecule/overflowMenuItem.js';
import radioTileFactory from './component/molecule/radioTile.js';
import sectionFactory from './component/molecule/section.js';
import skeletonIconFactory from './component/molecule/skeletonIcon.js';
import skeletonPlaceholderFactory from './component/molecule/skeletonPlaceholder.js';
import skeletonTextFactory from './component/molecule/skeletonText.js';
import skipToContentFactory from './component/molecule/skipToContent.js';
import vStackFactory from './component/molecule/vStack.js';
import switcherFactory from './component/molecule/switcher.js';
import switcherDividerFactory from './component/molecule/switcherDivider.js';
import switcherItemFactory from './component/molecule/switcherItem.js';

// Composites (form)
import selectFactory from './component/composite/select.js';
import comboBoxFactory from './component/composite/comboBox.js';
import multiSelectFactory from './component/composite/multiSelect.js';
import radioButtonGroupFactory from './component/composite/radioButtonGroup.js';
import checkboxGroupFactory from './component/composite/checkboxGroup.js';
import datePickerFactory from './component/composite/datePicker.js';
import timePickerFactory from './component/composite/timePicker.js';
import formGroupFactory from './component/composite/formGroup.js';
import dateInputFactory from './component/composite/dateInput.js';

// Molecules (file uploader, header, side nav, structured list)
import fileUploaderFactory from './component/composite/fileUploader.js';
import fileUploaderButtonFactory from './component/molecule/fileUploaderButton.js';
import fileUploaderDropContainerFactory from './component/molecule/fileUploaderDropContainer.js';
import fileUploaderItemFactory from './component/molecule/fileUploaderItem.js';
import filenameFactory from './component/molecule/filename.js';
import headerContainerFactory from './component/molecule/headerContainer.js';
import headerGlobalActionFactory from './component/molecule/headerGlobalAction.js';
import headerGlobalBarFactory from './component/molecule/headerGlobalBar.js';
import headerMenuFactory from './component/molecule/headerMenu.js';
import headerMenuItemFactory from './component/molecule/headerMenuItem.js';
import headerNameFactory from './component/molecule/headerName.js';
import headerSideNavItemsFactory from './component/molecule/headerSideNavItems.js';
import sideNavFactory from './component/molecule/sideNav.js';
import sideNavDetailsFactory from './component/molecule/sideNavDetails.js';
import sideNavDividerFactory from './component/molecule/sideNavDivider.js';
import sideNavFooterFactory from './component/molecule/sideNavFooter.js';
import sideNavHeaderFactory from './component/molecule/sideNavHeader.js';
import sideNavIconFactory from './component/molecule/sideNavIcon.js';
import sideNavItemFactory from './component/molecule/sideNavItem.js';
import sideNavItemsFactory from './component/molecule/sideNavItems.js';
import sideNavLinkFactory from './component/molecule/sideNavLink.js';
import sideNavLinkTextFactory from './component/molecule/sideNavLinkText.js';
import sideNavMenuFactory from './component/molecule/sideNavMenu.js';
import sideNavMenuItemFactory from './component/molecule/sideNavMenuItem.js';
import sideNavSwitcherFactory from './component/molecule/sideNavSwitcher.js';
import structuredListBodyFactory from './component/molecule/structuredListBody.js';
import structuredListHeadFactory from './component/molecule/structuredListHead.js';
import structuredListInputFactory from './component/molecule/structuredListInput.js';
import tabContentFactory from './component/molecule/tabContent.js';
import tabListVerticalFactory from './component/molecule/tabListVertical.js';
import tabPanelsFactory from './component/molecule/tabPanels.js';
import tabsVerticalFactory from './component/composite/tabsVertical.js';
import tileAboveTheFoldContentFactory from './component/molecule/tileAboveTheFoldContent.js';
import tileBelowTheFoldContentFactory from './component/molecule/tileBelowTheFoldContent.js';
import tileGroupFactory from './component/molecule/tileGroup.js';

// Variants
import buttonPrimaryOutlinedFactory from './component/variant/buttonPrimaryOutlined.js';

// Freeform
import rawBoxFactory from './component/freeform/rawBox.js';

// Providers
import overlayProviderFactory from './component/Overlay.js';
import liveRegionProviderFactory from './component/LiveRegionProvider.js';
import layerProviderFactory from './component/provider/layer.js';
import themeProviderFactory from './component/provider/theme.js';
import featureFlagsProviderFactory from './component/provider/featureFlags.js';
import idPrefixProviderFactory from './component/provider/idPrefix.js';
import fluidFormProviderFactory from './component/provider/fluidForm.js';
import errorBoundaryProviderFactory from './component/provider/errorBoundary.js';


/////////////////////////// Module-Loader START ////////////////////////////////

/********************************************************************
Factory loader. One call = one independent instance with its own
registry, styles, and injected dependencies.

@param {Object} shared_libs - Lib container; requires React, Utils,
                              Debug, Device; optional Icons
@param {Object} config      - Overrides merged over defaults

@return {Object} - Public Components interface
*********************************************************************/
export default function loader (shared_libs, config) {

  // Dependencies for this instance - by reference from the shared container
  const Lib = {
    Utils: shared_libs.Utils,
    Debug: shared_libs.Debug,
    React: shared_libs.React,
    Device: shared_libs.Device,
    Icons: shared_libs.Icons,
    Font: shared_libs.Font || null
  };

  // Merge overrides over defaults
  const CONFIG = Object.assign(
    {},
    DEFAULT_CONFIG,
    config || {}
  );

  // Load the validators singleton and inject Lib + ERRORS
  const Validators = createValidators(Lib, ERRORS);

  // Validate config - throws on misconfiguration
  Validators.validateConfig(CONFIG);

  // Validate required injections - throws on missing dependency
  Validators.validateInjections(shared_libs);

  // Mutable per-instance state: the built registry and styles, rebuilt on re-theme.
  // Contexts are created once per loader call, not inside build, so a rebuild
  // does not orphan mounted Consumers.
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

}/////////////////////////// Module-Loader END /////////////////////////////////



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
      const partsConfig = Object.assign({}, CONFIG, { STYLE_CONTRACT: STYLE_CONTRACT });

      const Parts = {
        A11y:             partsA11y(Lib, partsConfig, ERRORS),
        PressKeys:        partsPressKeys(Lib, partsConfig, ERRORS),
        RovingTabIndex:   partsRovingTabIndex(Lib, partsConfig, ERRORS),
        ControllableState: partsControllableState(Lib, partsConfig, ERRORS),
        AnchoredPosition: partsAnchoredPosition(Lib, partsConfig, ERRORS),
        FocusTrap:        partsFocusTrap(Lib, partsConfig, ERRORS),
        Overlay:          partsOverlay(Lib, partsConfig, ERRORS),
        CompoundContext:  partsCompoundContext(Lib, partsConfig, ERRORS),
        Units:            partsUnits(Lib, partsConfig, ERRORS),
        Typeface:         partsTypeface(Lib, partsConfig, ERRORS),
        Direction:        partsDirection(Lib, partsConfig, ERRORS)
      };

      // Generate utility styles for every breakpoint, memoized by key
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
      Component.View = make(viewFactory);
      Component.Text = make(textFactory);
      Component.Icon = make(iconFactory);
      Component.Image = make(imageFactory);
      Component.ProgressBar = make(progressBarFactory);
      Component.Button = make(buttonFactory);
      Component.TextInput = make(textInputFactory);
      Component.Toggle = make(toggleFactory);
      Component.Checkbox = make(checkboxFactory);
      Component.RadioButton = make(radioButtonFactory);
      Component.TextArea = make(textAreaFactory);
      Component.Slider = make(sliderFactory);
      Component.Link = make(linkFactory);
      Component.Skeleton = make(skeletonFactory);
      Component.Loading = make(loadingFactory);
      Component.Tag = make(tagFactory);
      Component.AspectRatio = make(aspectRatioFactory);
      Component.Heading = make(headingFactory);
      Component.BadgeIndicator = make(badgeIndicatorFactory);
      Component.ShapeIndicator = make(shapeIndicatorFactory);
      Component.IconIndicator = make(iconIndicatorFactory);

      // ~~~~~~~~~~ Molecules (canonical) ~~~~~~~~~~
      Component.ListItem = make(listItemFactory);
      Component.Dropdown = make(dropdownFactory);
      Component.Modal = make(modalFactory);
      Component.Search = make(searchFactory);
      Component.PasswordInput = make(passwordInputFactory);
      Component.NumberInput = make(numberInputFactory);
      Component.ExpandableSearch = make(expandableSearchFactory);
      Component.FormLabel = make(formLabelFactory);
      Component.FormItem = make(formItemFactory);
      Component.Stack = make(stackFactory);
      Component.ButtonSet = make(buttonSetFactory);
      Component.IconButton = make(iconButtonFactory);
      Component.CopyButton = make(copyButtonFactory);
      Component.UserAvatar = make(userAvatarFactory);
      Component.TruncatedText = make(truncatedTextFactory);
      Component.CodeSnippet = make(codeSnippetFactory);
      Component.InlineLoading = make(inlineLoadingFactory);
      Component.Tile = make(tileFactory);
      Component.ClickableTile = make(clickableTileFactory);
      Component.SelectableTile = make(selectableTileFactory);

      // ~~~~~~~~~~ Molecules (overlays) ~~~~~~~~~~
      Component.MenuItem = make(menuItemFactory);
      Component.MenuItemSelectable = make(menuItemSelectableFactory);
      Component.MenuItemDivider = make(menuItemDividerFactory);
      Component.ModalHeader = make(modalHeaderFactory);
      Component.ModalBody = make(modalBodyFactory);
      Component.ModalFooter = make(modalFooterFactory);
      Component.Popover = make(popoverFactory);
      Component.Tooltip = make(tooltipFactory);
      Component.DefinitionTooltip = make(definitionTooltipFactory);
      Component.Toggletip = make(toggletipFactory);

      // ~~~~~~~~~~ Composites (overlays) ~~~~~~~~~~
      Component.Menu = make(menuFactory);
      Component.OverflowMenu = make(overflowMenuFactory);
      Component.MenuButton = make(menuButtonFactory);
      Component.ComboButton = make(comboButtonFactory);
      Component.ComposedModal = make(composedModalFactory);
      Component.MenuItemRadioGroup = make(menuItemRadioGroupFactory);
      Component.SidePanel = make(sidePanelFactory);
      Component.AILabel = make(aiLabelFactory);
      Component.ActionSheet = make(actionSheetFactory);

      // ~~~~~~~~~~ Molecules (navigation) ~~~~~~~~~~
      Component.Tab = make(tabFactory);
      Component.TabList = make(tabListFactory);
      Component.TabPanel = make(tabPanelFactory);
      Component.AccordionItem = make(accordionItemFactory);
      Component.BreadcrumbItem = make(breadcrumbItemFactory);
      Component.Switch = make(switchFactory);
      Component.PaginationNav = make(paginationNavFactory);
      Component.TreeNode = make(treeNodeFactory);
      Component.ProgressStep = make(progressStepFactory);
      Component.HeaderNavigation = make(headerNavigationFactory);
      Component.HeaderMenuButton = make(headerMenuButtonFactory);
      Component.HeaderPanel = make(headerPanelFactory);

      // ~~~~~~~~~~ Composites (navigation) ~~~~~~~~~~
      Component.Tabs = make(tabsFactory);
      Component.Accordion = make(accordionFactory);
      Component.Breadcrumb = make(breadcrumbFactory);
      Component.ContentSwitcher = make(contentSwitcherFactory);
      Component.Pagination = make(paginationFactory);
      Component.TreeView = make(treeViewFactory);
      Component.ProgressIndicator = make(progressIndicatorFactory);
      Component.Header = make(headerFactory);

      // ~~~~~~~~~~ Molecules (feedback) ~~~~~~~~~~
      Component.Notification = make(notificationFactory);
      Component.ToastNotification = make(toastNotificationFactory);
      Component.TableBatchActions = make(tableBatchActionsFactory);
      Component.TableBatchAction = make(tableBatchActionFactory);
      Component.StaticNotification = make(staticNotificationFactory);
      Component.Callout = make(calloutFactory);

      // ~~~~~~~~~~ Molecules (data and layout) ~~~~~~~~~~
      Component.DataTable = make(dataTableFactory);
      Component.TableRow = make(tableRowFactory);
      Component.TableCell = make(tableCellFactory);
      Component.TableHeader = make(tableHeaderFactory);
      Component.TableBody = make(tableBodyFactory);
      Component.TableHead = make(tableHeadFactory);
      Component.Grid = make(gridFactory);
      Component.Row = make(rowFactory);
      Component.Column = make(columnFactory);
      Component.FlexGrid = make(flexGridFactory);
      Component.TableContainer = make(tableContainerFactory);
      Component.Form = make(formFactory);
      Component.OrderedList = make(orderedListFactory);
      Component.UnorderedList = make(unorderedListFactory);
      Component.ContainedListItem = make(containedListItemFactory);
      Component.StructuredListWrapper = make(structuredListWrapperFactory);
      Component.StructuredListRow = make(structuredListRowFactory);
      Component.StructuredListCell = make(structuredListCellFactory);
      Component.TableToolbar = make(tableToolbarFactory);

      // ~~~~~~~~~~ Composites (data and layout) ~~~~~~~~~~
      Component.DataTableRow = make(dataTableRowFactory);
      Component.ToggletipLabel = make(toggletipLabelFactory);

      // ~~~~~~~~~~ Molecules (platform-specific) ~~~~~~~~~~
      Component.InlineLink = make(inlineLinkFactory);
      Component.ErrorState = make(errorStateFactory);
      Component.LandingView = make(landingViewFactory);
      Component.List = make(listFactory);
      Component.NavigationList = make(navigationListFactory);
      Component.NavigationListItem = make(navigationListItemFactory);
      Component.WebHeader = make(webHeaderFactory);
      Component.ViewWrapper = make(viewWrapperFactory);
      Component.SafeAreaWrapper = make(safeAreaWrapperFactory);
      Component.GrantPermission = make(grantPermissionFactory);
      Component.BottomNavigationBar = make(bottomNavigationBarFactory);
      Component.BottomToolbar = make(bottomToolbarFactory);
      Component.BottomToolbarPrimaryAction = make(bottomToolbarPrimaryActionFactory);
      Component.BottomSafeAreaColorOverride = make(bottomSafeAreaColorOverrideFactory);
      Component.DocumentViewer = make(documentViewerFactory);
      Component.TopNavigationBar = make(topNavigationBarFactory);
      Component.TopNavigationBarLogin = make(topNavigationBarLoginFactory);
      Component.UiPanel = make(uiPanelFactory);
      Component.UiPanelItem = make(uiPanelItemFactory);
      Component.AcceptTerms = make(acceptTermsFactory);

      // ~~~~~~~~~~ Molecules (table family) ~~~~~~~~~~
      Component.Table = make(tableFactory);
      Component.DataTableCell = make(dataTableCellFactory);
      Component.DataTableHeader = make(dataTableHeaderFactory);
      Component.DataTableHeaderSelected = make(dataTableHeaderSelectedFactory);
      Component.TableActionList = make(tableActionListFactory);
      Component.TableDecoratorRow = make(tableDecoratorRowFactory);
      Component.TableExpandHeader = make(tableExpandHeaderFactory);
      Component.TableExpandRow = make(tableExpandRowFactory);
      Component.TableExpandedRow = make(tableExpandedRowFactory);
      Component.TableSelectAll = make(tableSelectAllFactory);
      Component.TableSelectRow = make(tableSelectRowFactory);
      Component.TableSlugRow = make(tableSlugRowFactory);
      Component.TableToolbarAction = make(tableToolbarActionFactory);
      Component.TableToolbarContent = make(tableToolbarContentFactory);
      Component.TableToolbarMenu = make(tableToolbarMenuFactory);
      Component.TableToolbarSearch = make(tableToolbarSearchFactory);

      // ~~~~~~~~~~ Molecules (form and select) ~~~~~~~~~~
      Component.ControlledPasswordInput = make(controlledPasswordInputFactory);
      Component.DatePickerInput = make(datePickerInputFactory);
      Component.ErrorBoundaryContext = make(errorBoundaryContextFactory);
      Component.FilterableMultiSelect = make(filterableMultiSelectFactory);
      Component.FormContext = make(formContextFactory);
      Component.PopoverContent = make(popoverContentFactory);
      Component.PrefixContext = make(prefixContextFactory);
      Component.SelectItem = make(selectItemFactory);
      Component.SelectItemGroup = make(selectItemGroupFactory);
      Component.SelectableTag = make(selectableTagFactory);
      Component.ThemeContext = make(themeContextFactory);
      Component.TimePickerSelect = make(timePickerSelectFactory);
      Component.ToggletipActions = make(toggletipActionsFactory);
      Component.ToggletipButton = make(toggletipButtonFactory);
      Component.ToggletipContent = make(toggletipContentFactory);

      // ~~~~~~~~~~ Molecules (notifications and utilities) ~~~~~~~~~~
      Component.AILabelActions = make(aILabelActionsFactory);
      Component.AILabelContent = make(aILabelContentFactory);
      Component.AISkeletonIcon = make(aISkeletonIconFactory);
      Component.AISkeletonPlaceholder = make(aISkeletonPlaceholderFactory);
      Component.AISkeletonText = make(aISkeletonTextFactory);
      Component.ActionableNotification = make(actionableNotificationFactory);
      Component.ColumnHang = make(columnHangFactory);
      Component.ContainedList = make(containedListFactory);
      Component.Content = make(contentFactory);
      Component.Copy = make(copyFactory);
      Component.DismissibleTag = make(dismissibleTagFactory);
      Component.ExpandableTile = make(expandableTileFactory);
      Component.GlobalTheme = make(globalThemeFactory);
      Component.GridSettings = make(gridSettingsFactory);
      Component.HStack = make(hStackFactory);
      Component.IconSwitch = make(iconSwitchFactory);
      Component.IconTab = make(iconTabFactory);
      Component.InlineNotification = make(inlineNotificationFactory);
      Component.MenuItemGroup = make(menuItemGroupFactory);
      Component.NotificationActionButton = make(notificationActionButtonFactory);
      Component.NotificationButton = make(notificationButtonFactory);
      Component.OperationalTag = make(operationalTagFactory);
      Component.OverflowMenuItem = make(overflowMenuItemFactory);
      Component.RadioTile = make(radioTileFactory);
      Component.Section = make(sectionFactory);
      Component.SkeletonIcon = make(skeletonIconFactory);
      Component.SkeletonPlaceholder = make(skeletonPlaceholderFactory);
      Component.SkeletonText = make(skeletonTextFactory);
      Component.SkipToContent = make(skipToContentFactory);
      Component.VStack = make(vStackFactory);
      Component.Switcher = make(switcherFactory);
      Component.SwitcherDivider = make(switcherDividerFactory);
      Component.SwitcherItem = make(switcherItemFactory);

      // ~~~~~~~~~~ Composites (form) ~~~~~~~~~~
      Component.Select = make(selectFactory);
      Component.ComboBox = make(comboBoxFactory);
      Component.MultiSelect = make(multiSelectFactory);
      Component.RadioButtonGroup = make(radioButtonGroupFactory);
      Component.CheckboxGroup = make(checkboxGroupFactory);
      Component.DatePicker = make(datePickerFactory);
      Component.TimePicker = make(timePickerFactory);
      Component.FormGroup = make(formGroupFactory);
      Component.DateInput = make(dateInputFactory);

      // ~~~~~~~~~~ Molecules (file uploader, header, side nav, structured list) ~~~~~~~~~~
      Component.FileUploader = make(fileUploaderFactory);
      Component.FileUploaderButton = make(fileUploaderButtonFactory);
      Component.FileUploaderDropContainer = make(fileUploaderDropContainerFactory);
      Component.FileUploaderItem = make(fileUploaderItemFactory);
      Component.Filename = make(filenameFactory);
      Component.HeaderContainer = make(headerContainerFactory);
      Component.HeaderGlobalAction = make(headerGlobalActionFactory);
      Component.HeaderGlobalBar = make(headerGlobalBarFactory);
      Component.HeaderMenu = make(headerMenuFactory);
      Component.HeaderMenuItem = make(headerMenuItemFactory);
      Component.HeaderName = make(headerNameFactory);
      Component.HeaderSideNavItems = make(headerSideNavItemsFactory);
      Component.SideNav = make(sideNavFactory);
      Component.SideNavDetails = make(sideNavDetailsFactory);
      Component.SideNavDivider = make(sideNavDividerFactory);
      Component.SideNavFooter = make(sideNavFooterFactory);
      Component.SideNavHeader = make(sideNavHeaderFactory);
      Component.SideNavIcon = make(sideNavIconFactory);
      Component.SideNavItem = make(sideNavItemFactory);
      Component.SideNavItems = make(sideNavItemsFactory);
      Component.SideNavLink = make(sideNavLinkFactory);
      Component.SideNavLinkText = make(sideNavLinkTextFactory);
      Component.SideNavMenu = make(sideNavMenuFactory);
      Component.SideNavMenuItem = make(sideNavMenuItemFactory);
      Component.SideNavSwitcher = make(sideNavSwitcherFactory);
      Component.StructuredListBody = make(structuredListBodyFactory);
      Component.StructuredListHead = make(structuredListHeadFactory);
      Component.StructuredListInput = make(structuredListInputFactory);
      Component.TabContent = make(tabContentFactory);
      Component.TabListVertical = make(tabListVerticalFactory);
      Component.TabPanels = make(tabPanelsFactory);
      Component.TabsVertical = make(tabsVerticalFactory);
      Component.TileAboveTheFoldContent = make(tileAboveTheFoldContentFactory);
      Component.TileBelowTheFoldContent = make(tileBelowTheFoldContentFactory);
      Component.TileGroup = make(tileGroupFactory);

      // ~~~~~~~~~~ Structured exceptions (variant registry) ~~~~~~~~~~
      Component.variant = {
        ButtonPrimaryOutlined: make(buttonPrimaryOutlinedFactory)
      };

      // ~~~~~~~~~~ Unstructured exceptions (freeform; NO tokens) ~~~~~~~~~~
      // Freeform factories receive Lib (for React access) but NOT Style or
      // Registry. They cannot read tokens or compose atoms. They take raw
      // styles only and do not retheme.
      Component.freeform = {
        RawBox: rawBoxFactory(Lib)
      };

      // ~~~~~~~~~~ Providers (context-only, no tokens, no visual output) ~~~~~~~~~~
      // Providers register at Component.provider.[name], matching the
      // Component.variant and Component.freeform namespacing. They do not
      // count toward the flat top-level key count.
      const overlayModule = overlayProviderFactory(Lib);
      const liveRegionModule = liveRegionProviderFactory(Lib);
      const layerModule = layerProviderFactory(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const themeModule = themeProviderFactory(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const featureFlagsModule = featureFlagsProviderFactory(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const idPrefixModule = idPrefixProviderFactory(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const fluidFormModule = fluidFormProviderFactory(Lib, CONFIG, ERRORS, Parts, Component, Style);
      const errorBoundaryModule = errorBoundaryProviderFactory(Lib, CONFIG, ERRORS, Parts, Component, Style);
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
      return themeContractBridge(themer_output);

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
