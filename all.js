// Info: GENERATED FILE - do not edit by hand.
// Produced by .github/ci-scripts/generate-exports.js from the component tree.
//
// Registration barrel. A consumer that wants the entire roster imports this
// module and passes each map to the matching createSystem registrar. Importing
// this file pulls in every component, so a consumer that wants a subset
// imports named components from the package root instead.

// Imports

// ~~~~~~~~~~ Atoms ~~~~~~~~~~
import aspectRatioFactory from './component/atom/aspectRatio.js';
import badgeIndicatorFactory from './component/atom/badgeIndicator.js';
import buttonFactory from './component/atom/button.js';
import checkboxFactory from './component/atom/checkbox.js';
import headingFactory from './component/atom/heading.js';
import iconFactory from './component/atom/icon.js';
import iconIndicatorFactory from './component/atom/iconIndicator.js';
import imageFactory from './component/atom/image.js';
import inlineLinkFactory from './component/atom/inlineLink.js';
import linkFactory from './component/atom/link.js';
import loadingFactory from './component/atom/loading.js';
import progressBarFactory from './component/atom/progressBar.js';
import radioButtonFactory from './component/atom/radioButton.js';
import shapeIndicatorFactory from './component/atom/shapeIndicator.js';
import skeletonFactory from './component/atom/skeleton.js';
import sliderFactory from './component/atom/slider.js';
import tagFactory from './component/atom/tag.js';
import textFactory from './component/atom/text.js';
import textAreaFactory from './component/atom/textArea.js';
import textInputFactory from './component/atom/textInput.js';
import toggleFactory from './component/atom/toggle.js';
import viewFactory from './component/atom/view.js';

// ~~~~~~~~~~ Molecules ~~~~~~~~~~
import aILabelActionsFactory from './component/molecule/aILabelActions.js';
import aILabelContentFactory from './component/molecule/aILabelContent.js';
import aISkeletonIconFactory from './component/molecule/aISkeletonIcon.js';
import aISkeletonPlaceholderFactory from './component/molecule/aISkeletonPlaceholder.js';
import aISkeletonTextFactory from './component/molecule/aISkeletonText.js';
import accordionItemFactory from './component/molecule/accordionItem.js';
import actionableNotificationFactory from './component/molecule/actionableNotification.js';
import bottomNavigationBarFactory from './component/molecule/bottomNavigationBar.js';
import bottomSafeAreaColorOverrideFactory from './component/molecule/bottomSafeAreaColorOverride.js';
import bottomToolbarFactory from './component/molecule/bottomToolbar.js';
import bottomToolbarPrimaryActionFactory from './component/molecule/bottomToolbarPrimaryAction.js';
import breadcrumbItemFactory from './component/molecule/breadcrumbItem.js';
import buttonSetFactory from './component/molecule/buttonSet.js';
import calloutFactory from './component/molecule/callout.js';
import clickableTileFactory from './component/molecule/clickableTile.js';
import codeSnippetFactory from './component/molecule/codeSnippet.js';
import columnFactory from './component/molecule/column.js';
import columnHangFactory from './component/molecule/columnHang.js';
import containedListFactory from './component/molecule/containedList.js';
import containedListItemFactory from './component/molecule/containedListItem.js';
import contentFactory from './component/molecule/content.js';
import controlledPasswordInputFactory from './component/molecule/controlledPasswordInput.js';
import copyFactory from './component/molecule/copy.js';
import copyButtonFactory from './component/molecule/copyButton.js';
import dataTableFactory from './component/molecule/dataTable.js';
import dataTableCellFactory from './component/molecule/dataTableCell.js';
import dataTableHeaderFactory from './component/molecule/dataTableHeader.js';
import dataTableHeaderSelectedFactory from './component/molecule/dataTableHeaderSelected.js';
import datePickerInputFactory from './component/molecule/datePickerInput.js';
import definitionTooltipFactory from './component/molecule/definitionTooltip.js';
import dismissibleTagFactory from './component/molecule/dismissibleTag.js';
import documentViewerFactory from './component/molecule/documentViewer.js';
import dropdownFactory from './component/molecule/dropdown.js';
import errorBoundaryContextFactory from './component/molecule/errorBoundaryContext.js';
import errorStateFactory from './component/molecule/errorState.js';
import expandableSearchFactory from './component/molecule/expandableSearch.js';
import expandableTileFactory from './component/molecule/expandableTile.js';
import fileUploaderButtonFactory from './component/molecule/fileUploaderButton.js';
import fileUploaderDropContainerFactory from './component/molecule/fileUploaderDropContainer.js';
import fileUploaderItemFactory from './component/molecule/fileUploaderItem.js';
import filenameFactory from './component/molecule/filename.js';
import flexGridFactory from './component/molecule/flexGrid.js';
import formFactory from './component/molecule/form.js';
import formContextFactory from './component/molecule/formContext.js';
import formItemFactory from './component/molecule/formItem.js';
import formLabelFactory from './component/molecule/formLabel.js';
import globalThemeFactory from './component/molecule/globalTheme.js';
import grantPermissionFactory from './component/molecule/grantPermission.js';
import gridFactory from './component/molecule/grid.js';
import gridSettingsFactory from './component/molecule/gridSettings.js';
import hStackFactory from './component/molecule/hStack.js';
import headerContainerFactory from './component/molecule/headerContainer.js';
import headerGlobalActionFactory from './component/molecule/headerGlobalAction.js';
import headerGlobalBarFactory from './component/molecule/headerGlobalBar.js';
import headerMenuFactory from './component/molecule/headerMenu.js';
import headerMenuButtonFactory from './component/molecule/headerMenuButton.js';
import headerMenuItemFactory from './component/molecule/headerMenuItem.js';
import headerNameFactory from './component/molecule/headerName.js';
import headerNavigationFactory from './component/molecule/headerNavigation.js';
import headerPanelFactory from './component/molecule/headerPanel.js';
import headerSideNavItemsFactory from './component/molecule/headerSideNavItems.js';
import iconButtonFactory from './component/molecule/iconButton.js';
import iconSwitchFactory from './component/molecule/iconSwitch.js';
import iconTabFactory from './component/molecule/iconTab.js';
import inlineLoadingFactory from './component/molecule/inlineLoading.js';
import inlineNotificationFactory from './component/molecule/inlineNotification.js';
import landingViewFactory from './component/molecule/landingView.js';
import listFactory from './component/molecule/list.js';
import listItemFactory from './component/molecule/listItem.js';
import menuItemFactory from './component/molecule/menuItem.js';
import menuItemDividerFactory from './component/molecule/menuItemDivider.js';
import menuItemGroupFactory from './component/molecule/menuItemGroup.js';
import menuItemSelectableFactory from './component/molecule/menuItemSelectable.js';
import modalFactory from './component/molecule/modal.js';
import modalBodyFactory from './component/molecule/modalBody.js';
import modalFooterFactory from './component/molecule/modalFooter.js';
import modalHeaderFactory from './component/molecule/modalHeader.js';
import navigationListFactory from './component/molecule/navigationList.js';
import navigationListItemFactory from './component/molecule/navigationListItem.js';
import notificationFactory from './component/molecule/notification.js';
import notificationActionButtonFactory from './component/molecule/notificationActionButton.js';
import notificationButtonFactory from './component/molecule/notificationButton.js';
import numberInputFactory from './component/molecule/numberInput.js';
import operationalTagFactory from './component/molecule/operationalTag.js';
import orderedListFactory from './component/molecule/orderedList.js';
import overflowMenuItemFactory from './component/molecule/overflowMenuItem.js';
import paginationNavFactory from './component/molecule/paginationNav.js';
import passwordInputFactory from './component/molecule/passwordInput.js';
import popoverFactory from './component/molecule/popover.js';
import popoverContentFactory from './component/molecule/popoverContent.js';
import prefixContextFactory from './component/molecule/prefixContext.js';
import progressStepFactory from './component/molecule/progressStep.js';
import radioTileFactory from './component/molecule/radioTile.js';
import rowFactory from './component/molecule/row.js';
import safeAreaWrapperFactory from './component/molecule/safeAreaWrapper.js';
import searchFactory from './component/molecule/search.js';
import sectionFactory from './component/molecule/section.js';
import selectItemFactory from './component/molecule/selectItem.js';
import selectItemGroupFactory from './component/molecule/selectItemGroup.js';
import selectableTagFactory from './component/molecule/selectableTag.js';
import selectableTileFactory from './component/molecule/selectableTile.js';
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
import skeletonIconFactory from './component/molecule/skeletonIcon.js';
import skeletonPlaceholderFactory from './component/molecule/skeletonPlaceholder.js';
import skeletonTextFactory from './component/molecule/skeletonText.js';
import skipToContentFactory from './component/molecule/skipToContent.js';
import stackFactory from './component/molecule/stack.js';
import staticNotificationFactory from './component/molecule/staticNotification.js';
import structuredListBodyFactory from './component/molecule/structuredListBody.js';
import structuredListCellFactory from './component/molecule/structuredListCell.js';
import structuredListHeadFactory from './component/molecule/structuredListHead.js';
import structuredListInputFactory from './component/molecule/structuredListInput.js';
import structuredListRowFactory from './component/molecule/structuredListRow.js';
import structuredListWrapperFactory from './component/molecule/structuredListWrapper.js';
import switchFactory from './component/molecule/switch.js';
import switcherFactory from './component/molecule/switcher.js';
import switcherDividerFactory from './component/molecule/switcherDivider.js';
import switcherItemFactory from './component/molecule/switcherItem.js';
import tabFactory from './component/molecule/tab.js';
import tabContentFactory from './component/molecule/tabContent.js';
import tabListFactory from './component/molecule/tabList.js';
import tabListVerticalFactory from './component/molecule/tabListVertical.js';
import tabPanelFactory from './component/molecule/tabPanel.js';
import tabPanelsFactory from './component/molecule/tabPanels.js';
import tableFactory from './component/molecule/table.js';
import tableActionListFactory from './component/molecule/tableActionList.js';
import tableBatchActionFactory from './component/molecule/tableBatchAction.js';
import tableBatchActionsFactory from './component/molecule/tableBatchActions.js';
import tableBodyFactory from './component/molecule/tableBody.js';
import tableCellFactory from './component/molecule/tableCell.js';
import tableContainerFactory from './component/molecule/tableContainer.js';
import tableDecoratorRowFactory from './component/molecule/tableDecoratorRow.js';
import tableExpandHeaderFactory from './component/molecule/tableExpandHeader.js';
import tableExpandRowFactory from './component/molecule/tableExpandRow.js';
import tableExpandedRowFactory from './component/molecule/tableExpandedRow.js';
import tableHeadFactory from './component/molecule/tableHead.js';
import tableHeaderFactory from './component/molecule/tableHeader.js';
import tableRowFactory from './component/molecule/tableRow.js';
import tableSelectAllFactory from './component/molecule/tableSelectAll.js';
import tableSelectRowFactory from './component/molecule/tableSelectRow.js';
import tableSlugRowFactory from './component/molecule/tableSlugRow.js';
import tableToolbarFactory from './component/molecule/tableToolbar.js';
import tableToolbarActionFactory from './component/molecule/tableToolbarAction.js';
import tableToolbarContentFactory from './component/molecule/tableToolbarContent.js';
import tableToolbarMenuFactory from './component/molecule/tableToolbarMenu.js';
import tableToolbarSearchFactory from './component/molecule/tableToolbarSearch.js';
import themeContextFactory from './component/molecule/themeContext.js';
import tileFactory from './component/molecule/tile.js';
import tileAboveTheFoldContentFactory from './component/molecule/tileAboveTheFoldContent.js';
import tileBelowTheFoldContentFactory from './component/molecule/tileBelowTheFoldContent.js';
import tileGroupFactory from './component/molecule/tileGroup.js';
import timePickerSelectFactory from './component/molecule/timePickerSelect.js';
import toastNotificationFactory from './component/molecule/toastNotification.js';
import toggletipFactory from './component/molecule/toggletip.js';
import toggletipActionsFactory from './component/molecule/toggletipActions.js';
import toggletipButtonFactory from './component/molecule/toggletipButton.js';
import toggletipContentFactory from './component/molecule/toggletipContent.js';
import tooltipFactory from './component/molecule/tooltip.js';
import topNavigationBarFactory from './component/molecule/topNavigationBar.js';
import topNavigationBarLoginFactory from './component/molecule/topNavigationBarLogin.js';
import treeNodeFactory from './component/molecule/treeNode.js';
import truncatedTextFactory from './component/molecule/truncatedText.js';
import uiPanelFactory from './component/molecule/uiPanel.js';
import uiPanelItemFactory from './component/molecule/uiPanelItem.js';
import unorderedListFactory from './component/molecule/unorderedList.js';
import userAvatarFactory from './component/molecule/userAvatar.js';
import vStackFactory from './component/molecule/vStack.js';
import viewWrapperFactory from './component/molecule/viewWrapper.js';
import webHeaderFactory from './component/molecule/webHeader.js';

// ~~~~~~~~~~ Composites ~~~~~~~~~~
import aILabelFactory from './component/composite/aILabel.js';
import acceptTermsFactory from './component/composite/acceptTerms.js';
import accordionFactory from './component/composite/accordion.js';
import actionSheetFactory from './component/composite/actionSheet.js';
import breadcrumbFactory from './component/composite/breadcrumb.js';
import checkboxGroupFactory from './component/composite/checkboxGroup.js';
import comboBoxFactory from './component/composite/comboBox.js';
import comboButtonFactory from './component/composite/comboButton.js';
import composedModalFactory from './component/composite/composedModal.js';
import contentSwitcherFactory from './component/composite/contentSwitcher.js';
import dataTableRowFactory from './component/composite/dataTableRow.js';
import dateInputFactory from './component/composite/dateInput.js';
import datePickerFactory from './component/composite/datePicker.js';
import fileUploaderFactory from './component/composite/fileUploader.js';
import filterableMultiSelectFactory from './component/composite/filterableMultiSelect.js';
import formGroupFactory from './component/composite/formGroup.js';
import headerFactory from './component/composite/header.js';
import menuFactory from './component/composite/menu.js';
import menuButtonFactory from './component/composite/menuButton.js';
import menuItemRadioGroupFactory from './component/composite/menuItemRadioGroup.js';
import multiSelectFactory from './component/composite/multiSelect.js';
import overflowMenuFactory from './component/composite/overflowMenu.js';
import paginationFactory from './component/composite/pagination.js';
import progressIndicatorFactory from './component/composite/progressIndicator.js';
import radioButtonGroupFactory from './component/composite/radioButtonGroup.js';
import selectFactory from './component/composite/select.js';
import sidePanelFactory from './component/composite/sidePanel.js';
import tabsFactory from './component/composite/tabs.js';
import tabsVerticalFactory from './component/composite/tabsVertical.js';
import timePickerFactory from './component/composite/timePicker.js';
import toggletipLabelFactory from './component/composite/toggletipLabel.js';
import treeViewFactory from './component/composite/treeView.js';

// ~~~~~~~~~~ Variants ~~~~~~~~~~
import buttonPrimaryOutlinedFactory from './component/variant/buttonPrimaryOutlined.js';

// ~~~~~~~~~~ Freeform ~~~~~~~~~~
import rawBoxFactory from './component/freeform/rawBox.js';

// ~~~~~~~~~~ Providers ~~~~~~~~~~
import errorBoundaryFactory from './component/provider/errorBoundary.js';
import featureFlagsFactory from './component/provider/featureFlags.js';
import fluidFormFactory from './component/provider/fluidForm.js';
import idPrefixFactory from './component/provider/idPrefix.js';
import layerFactory from './component/provider/layer.js';
import liveRegionProviderFactory from './component/provider/liveRegionProvider.js';
import overlayFactory from './component/provider/overlay.js';
import themeFactory from './component/provider/theme.js';


/////////////////////////// Registration Maps START ////////////////////////////

// Flat components registered at Component.[name]
const COMPONENTS = Object.freeze({
  AILabel: aILabelFactory,
  AILabelActions: aILabelActionsFactory,
  AILabelContent: aILabelContentFactory,
  AISkeletonIcon: aISkeletonIconFactory,
  AISkeletonPlaceholder: aISkeletonPlaceholderFactory,
  AISkeletonText: aISkeletonTextFactory,
  AcceptTerms: acceptTermsFactory,
  Accordion: accordionFactory,
  AccordionItem: accordionItemFactory,
  ActionSheet: actionSheetFactory,
  ActionableNotification: actionableNotificationFactory,
  AspectRatio: aspectRatioFactory,
  BadgeIndicator: badgeIndicatorFactory,
  BottomNavigationBar: bottomNavigationBarFactory,
  BottomSafeAreaColorOverride: bottomSafeAreaColorOverrideFactory,
  BottomToolbar: bottomToolbarFactory,
  BottomToolbarPrimaryAction: bottomToolbarPrimaryActionFactory,
  Breadcrumb: breadcrumbFactory,
  BreadcrumbItem: breadcrumbItemFactory,
  Button: buttonFactory,
  ButtonSet: buttonSetFactory,
  Callout: calloutFactory,
  Checkbox: checkboxFactory,
  CheckboxGroup: checkboxGroupFactory,
  ClickableTile: clickableTileFactory,
  CodeSnippet: codeSnippetFactory,
  Column: columnFactory,
  ColumnHang: columnHangFactory,
  ComboBox: comboBoxFactory,
  ComboButton: comboButtonFactory,
  ComposedModal: composedModalFactory,
  ContainedList: containedListFactory,
  ContainedListItem: containedListItemFactory,
  Content: contentFactory,
  ContentSwitcher: contentSwitcherFactory,
  ControlledPasswordInput: controlledPasswordInputFactory,
  Copy: copyFactory,
  CopyButton: copyButtonFactory,
  DataTable: dataTableFactory,
  DataTableCell: dataTableCellFactory,
  DataTableHeader: dataTableHeaderFactory,
  DataTableHeaderSelected: dataTableHeaderSelectedFactory,
  DataTableRow: dataTableRowFactory,
  DateInput: dateInputFactory,
  DatePicker: datePickerFactory,
  DatePickerInput: datePickerInputFactory,
  DefinitionTooltip: definitionTooltipFactory,
  DismissibleTag: dismissibleTagFactory,
  DocumentViewer: documentViewerFactory,
  Dropdown: dropdownFactory,
  ErrorBoundaryContext: errorBoundaryContextFactory,
  ErrorState: errorStateFactory,
  ExpandableSearch: expandableSearchFactory,
  ExpandableTile: expandableTileFactory,
  FileUploader: fileUploaderFactory,
  FileUploaderButton: fileUploaderButtonFactory,
  FileUploaderDropContainer: fileUploaderDropContainerFactory,
  FileUploaderItem: fileUploaderItemFactory,
  Filename: filenameFactory,
  FilterableMultiSelect: filterableMultiSelectFactory,
  FlexGrid: flexGridFactory,
  Form: formFactory,
  FormContext: formContextFactory,
  FormGroup: formGroupFactory,
  FormItem: formItemFactory,
  FormLabel: formLabelFactory,
  GlobalTheme: globalThemeFactory,
  GrantPermission: grantPermissionFactory,
  Grid: gridFactory,
  GridSettings: gridSettingsFactory,
  HStack: hStackFactory,
  Header: headerFactory,
  HeaderContainer: headerContainerFactory,
  HeaderGlobalAction: headerGlobalActionFactory,
  HeaderGlobalBar: headerGlobalBarFactory,
  HeaderMenu: headerMenuFactory,
  HeaderMenuButton: headerMenuButtonFactory,
  HeaderMenuItem: headerMenuItemFactory,
  HeaderName: headerNameFactory,
  HeaderNavigation: headerNavigationFactory,
  HeaderPanel: headerPanelFactory,
  HeaderSideNavItems: headerSideNavItemsFactory,
  Heading: headingFactory,
  Icon: iconFactory,
  IconButton: iconButtonFactory,
  IconIndicator: iconIndicatorFactory,
  IconSwitch: iconSwitchFactory,
  IconTab: iconTabFactory,
  Image: imageFactory,
  InlineLink: inlineLinkFactory,
  InlineLoading: inlineLoadingFactory,
  InlineNotification: inlineNotificationFactory,
  LandingView: landingViewFactory,
  Link: linkFactory,
  List: listFactory,
  ListItem: listItemFactory,
  Loading: loadingFactory,
  Menu: menuFactory,
  MenuButton: menuButtonFactory,
  MenuItem: menuItemFactory,
  MenuItemDivider: menuItemDividerFactory,
  MenuItemGroup: menuItemGroupFactory,
  MenuItemRadioGroup: menuItemRadioGroupFactory,
  MenuItemSelectable: menuItemSelectableFactory,
  Modal: modalFactory,
  ModalBody: modalBodyFactory,
  ModalFooter: modalFooterFactory,
  ModalHeader: modalHeaderFactory,
  MultiSelect: multiSelectFactory,
  NavigationList: navigationListFactory,
  NavigationListItem: navigationListItemFactory,
  Notification: notificationFactory,
  NotificationActionButton: notificationActionButtonFactory,
  NotificationButton: notificationButtonFactory,
  NumberInput: numberInputFactory,
  OperationalTag: operationalTagFactory,
  OrderedList: orderedListFactory,
  OverflowMenu: overflowMenuFactory,
  OverflowMenuItem: overflowMenuItemFactory,
  Pagination: paginationFactory,
  PaginationNav: paginationNavFactory,
  PasswordInput: passwordInputFactory,
  Popover: popoverFactory,
  PopoverContent: popoverContentFactory,
  PrefixContext: prefixContextFactory,
  ProgressBar: progressBarFactory,
  ProgressIndicator: progressIndicatorFactory,
  ProgressStep: progressStepFactory,
  RadioButton: radioButtonFactory,
  RadioButtonGroup: radioButtonGroupFactory,
  RadioTile: radioTileFactory,
  Row: rowFactory,
  SafeAreaWrapper: safeAreaWrapperFactory,
  Search: searchFactory,
  Section: sectionFactory,
  Select: selectFactory,
  SelectItem: selectItemFactory,
  SelectItemGroup: selectItemGroupFactory,
  SelectableTag: selectableTagFactory,
  SelectableTile: selectableTileFactory,
  ShapeIndicator: shapeIndicatorFactory,
  SideNav: sideNavFactory,
  SideNavDetails: sideNavDetailsFactory,
  SideNavDivider: sideNavDividerFactory,
  SideNavFooter: sideNavFooterFactory,
  SideNavHeader: sideNavHeaderFactory,
  SideNavIcon: sideNavIconFactory,
  SideNavItem: sideNavItemFactory,
  SideNavItems: sideNavItemsFactory,
  SideNavLink: sideNavLinkFactory,
  SideNavLinkText: sideNavLinkTextFactory,
  SideNavMenu: sideNavMenuFactory,
  SideNavMenuItem: sideNavMenuItemFactory,
  SideNavSwitcher: sideNavSwitcherFactory,
  SidePanel: sidePanelFactory,
  Skeleton: skeletonFactory,
  SkeletonIcon: skeletonIconFactory,
  SkeletonPlaceholder: skeletonPlaceholderFactory,
  SkeletonText: skeletonTextFactory,
  SkipToContent: skipToContentFactory,
  Slider: sliderFactory,
  Stack: stackFactory,
  StaticNotification: staticNotificationFactory,
  StructuredListBody: structuredListBodyFactory,
  StructuredListCell: structuredListCellFactory,
  StructuredListHead: structuredListHeadFactory,
  StructuredListInput: structuredListInputFactory,
  StructuredListRow: structuredListRowFactory,
  StructuredListWrapper: structuredListWrapperFactory,
  Switch: switchFactory,
  Switcher: switcherFactory,
  SwitcherDivider: switcherDividerFactory,
  SwitcherItem: switcherItemFactory,
  Tab: tabFactory,
  TabContent: tabContentFactory,
  TabList: tabListFactory,
  TabListVertical: tabListVerticalFactory,
  TabPanel: tabPanelFactory,
  TabPanels: tabPanelsFactory,
  Table: tableFactory,
  TableActionList: tableActionListFactory,
  TableBatchAction: tableBatchActionFactory,
  TableBatchActions: tableBatchActionsFactory,
  TableBody: tableBodyFactory,
  TableCell: tableCellFactory,
  TableContainer: tableContainerFactory,
  TableDecoratorRow: tableDecoratorRowFactory,
  TableExpandHeader: tableExpandHeaderFactory,
  TableExpandRow: tableExpandRowFactory,
  TableExpandedRow: tableExpandedRowFactory,
  TableHead: tableHeadFactory,
  TableHeader: tableHeaderFactory,
  TableRow: tableRowFactory,
  TableSelectAll: tableSelectAllFactory,
  TableSelectRow: tableSelectRowFactory,
  TableSlugRow: tableSlugRowFactory,
  TableToolbar: tableToolbarFactory,
  TableToolbarAction: tableToolbarActionFactory,
  TableToolbarContent: tableToolbarContentFactory,
  TableToolbarMenu: tableToolbarMenuFactory,
  TableToolbarSearch: tableToolbarSearchFactory,
  Tabs: tabsFactory,
  TabsVertical: tabsVerticalFactory,
  Tag: tagFactory,
  Text: textFactory,
  TextArea: textAreaFactory,
  TextInput: textInputFactory,
  ThemeContext: themeContextFactory,
  Tile: tileFactory,
  TileAboveTheFoldContent: tileAboveTheFoldContentFactory,
  TileBelowTheFoldContent: tileBelowTheFoldContentFactory,
  TileGroup: tileGroupFactory,
  TimePicker: timePickerFactory,
  TimePickerSelect: timePickerSelectFactory,
  ToastNotification: toastNotificationFactory,
  Toggle: toggleFactory,
  Toggletip: toggletipFactory,
  ToggletipActions: toggletipActionsFactory,
  ToggletipButton: toggletipButtonFactory,
  ToggletipContent: toggletipContentFactory,
  ToggletipLabel: toggletipLabelFactory,
  Tooltip: tooltipFactory,
  TopNavigationBar: topNavigationBarFactory,
  TopNavigationBarLogin: topNavigationBarLoginFactory,
  TreeNode: treeNodeFactory,
  TreeView: treeViewFactory,
  TruncatedText: truncatedTextFactory,
  UiPanel: uiPanelFactory,
  UiPanelItem: uiPanelItemFactory,
  UnorderedList: unorderedListFactory,
  UserAvatar: userAvatarFactory,
  VStack: vStackFactory,
  View: viewFactory,
  ViewWrapper: viewWrapperFactory,
  WebHeader: webHeaderFactory
});

// Structured exceptions registered at Component.variant.[name]
const VARIANTS = Object.freeze({
  ButtonPrimaryOutlined: buttonPrimaryOutlinedFactory
});

// Unstructured exceptions registered at Component.freeform.[name]
const FREEFORMS = Object.freeze({
  RawBox: rawBoxFactory
});

// Context providers registered at Component.provider.[name]
const PROVIDERS = Object.freeze({
  ErrorBoundary: errorBoundaryFactory,
  FeatureFlags: featureFlagsFactory,
  FluidForm: fluidFormFactory,
  IdPrefix: idPrefixFactory,
  Layer: layerFactory,
  LiveRegionProvider: liveRegionProviderFactory,
  Overlay: overlayFactory,
  Theme: themeFactory
});

/////////////////////////// Registration Maps END //////////////////////////////


export { COMPONENTS, VARIANTS, FREEFORMS, PROVIDERS };
