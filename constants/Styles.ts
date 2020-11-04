import { StyleSheet } from "react-native";
import Colors from "./Colors";
import Layout from "./Layout";
import { Size } from "./Sizes";

export const baseStyles = StyleSheet.create({
  /* Flex */
  flexRowWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexGrow: {
    flexGrow: 1
  },
  flexJustifyEnd: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  /* Text styles */
  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textLarge: {
    fontSize: 20,
  },
  textNormal: {
    fontSize: 15,
  },
  textCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  /* Margins */
  marginTopLarge: {
    marginTop: 15,
  },
  marginTopSmall: {
    marginTop: 5,
  },
  marginVerticalSmall: {
    marginVertical: 5,
  },

  /* Paddings */
  paddingNormal: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  paddingLarge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  /* Size */
  widthFull: {
    width: '100%',
  },
  infoMaxWidth: {
    width: '100%',
    maxWidth: Size.infoMaxWidth
  },

  /* Border */
  borderNormal: {
    borderWidth: 2,
  },

  /* Border Radius */
  curveSmall: {
    borderRadius: 5,
  },
  curveNormal: {
    borderRadius: 10,
  },

  /* Standard Color */
  linkColor: {
    color: Colors.light.link
  },
  backgroundColorLight: {
    backgroundColor: Colors.light.background
  },
  borderColorTag: {
    borderColor: Colors.light.tagOutlineDefault
  },

  /* Highlight and featured */
  backgroundColorFeatured: {
    backgroundColor: Colors.featured.background
  },

  /* Color for dark theme */
  darkTextColor: {
    color: Colors.dark.text,
  },
  darkLinkColor: {
    color: Colors.dark.link,
  },

  /* Drop Shadow */
  dropShadow: {
    shadowColor: Colors.light.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export const SharedStyles = StyleSheet.create({
  linkText: {
    ...baseStyles.textNormal,
    ...baseStyles.linkColor
  },
  maintainInfoWidth: {
    ...baseStyles.infoMaxWidth,
    ...baseStyles.paddingLarge,
    flex: 1,
    paddingBottom: 20,
    margin: 'auto'
  },
  textHeaderMargin: {
    ...baseStyles.textHeader,
    ...baseStyles.marginTopLarge
  },
  textLargeMargin: {
    ...baseStyles.textLarge,
    ...baseStyles.marginTopSmall
  },
  textNormalMargin: {
    ...baseStyles.textNormal,
    ...baseStyles.marginTopSmall
  },
  tagChipSpacing: {
    ...baseStyles.marginVerticalSmall,
    marginRight: 10,
  },
});

export const AppFooterStyles = StyleSheet.create({
  footer: {
    ...baseStyles.paddingNormal,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
  },
  footerText: {
    ...baseStyles.textNormal, 
    ...baseStyles.marginVerticalSmall,
    ...baseStyles.darkTextColor
  },
  footerLink: {
    ...baseStyles.textNormal, 
    ...baseStyles.marginVerticalSmall,
    ...baseStyles.darkLinkColor
  }
});

export const CompanyLogoStyles = StyleSheet.create({
  image: {
    minWidth: Size.imageSize,
    maxWidth: Size.imageSize,
    minHeight: Size.imageSize,
    maxHeight: Size.imageSize,
  },
  imageWrapper: {
    ...baseStyles.flexCenter,
    ...baseStyles.curveNormal,
    resizeMode: 'contain',
    backgroundColor: Colors.light.backgroundPale,
    marginRight: 10,
    overflow: 'hidden'
  },
  logoText: {
    position: 'absolute',
    color: Colors.light.darkGray,
    fontSize: 40,
  },
});

export const FilterScreenStyles = StyleSheet.create({
  filterContainer: {
    ...baseStyles.flexRowWrap,
    alignItems: 'center',
  },
});

export const JobDescriptionStyles = StyleSheet.create({
  jobContainer: {
    flexDirection: 'column',
    overflow: 'scroll',
    alignItems: 'center',
  },
  topBackground: {
    backgroundColor: Colors.light.backgroundDim,
  },
  jobInfoHeader: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 'auto',
  },
});

export const JobViewStyles = StyleSheet.create({
  jobView: {
    ...baseStyles.widthFull,
    ...baseStyles.paddingLarge,
    ...baseStyles.backgroundColorLight,
    minHeight: 120,
  },
  featured: {
    ...baseStyles.backgroundColorFeatured,
    minHeight: 160,
  },
  jobContentWrapper: {
    ...baseStyles.flexRowWrap,
    ...baseStyles.infoMaxWidth,
    flexWrap: 'nowrap',
    alignItems: 'center',
    margin: 'auto',
  },
  jobInfo: {
    ...baseStyles.flexRowWrap,
  },
  jobTextContainer: {
    ...baseStyles.flexColumn,
    flex: 2,
    minWidth: 200,
  },
  timeAgoText: {
    ...baseStyles.textNormal,
    color: Colors.light.lightGray,
  },
});

export const JobTagsStyles = StyleSheet.create({
  tagChipContainer: {
    ...baseStyles.flexRowWrap,
    ...baseStyles.marginVerticalSmall,
    minWidth: 150,
  },
  selectedChip: {
    backgroundColor: Colors.featured.text,
    borderColor: Colors.featured.text,
    color: Colors.dark.text,
  },
  featuredText: {
    borderColor: Colors.featured.text,
    color: Colors.featured.text,
  },
});

export const SearchScreenStyles = StyleSheet.create({
  subheader: {
    ...baseStyles.infoMaxWidth,
    ...baseStyles.backgroundColorLight,
    flexShrink: 1,
    flexDirection: 'row',
    margin: 'auto',
    zIndex: 10,
  },
});

export const SimpleChipStyles = StyleSheet.create({
  chipText: {
    ...baseStyles.paddingNormal,
    ...baseStyles.borderNormal,
    ...baseStyles.curveSmall,
    ...baseStyles.textCenter,
    ...baseStyles.borderColorTag
  },
  featuredChip: {
    ...baseStyles.infoMaxWidth,
    marginHorizontal: 'auto',
  },
  featuredText: {
    borderColor: Colors.featured.text,
    color: Colors.featured.text,
    alignSelf: 'flex-start'
  },
});
