import { TextStyle } from 'react-native';
import { colors } from './colors';

export const fonts = {
  display: 'Parisienne_400Regular',
  heading: 'InstrumentSerif_400Regular',
  body: 'DMSans_400Regular',
  bodyItalic: 'DMSans_400Regular_Italic',
  bodyMedium: 'DMSans_500Medium',
  bodySemiBold: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
} as const;

export const typography = {
  displayName: {
    fontFamily: fonts.display,
    fontSize: 80,
    lineHeight: 100,
    color: colors.oliveDark,
    textAlign: 'center',
  } satisfies TextStyle,

  h1: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.oliveDark,
  } satisfies TextStyle,

  h2: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.oliveDark,
  } satisfies TextStyle,

  h3: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.oliveDark,
  } satisfies TextStyle,

  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.moss,
    textTransform: 'uppercase',
  } satisfies TextStyle,

  bodyBold: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.oliveDark,
  } satisfies TextStyle,

  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.moss,
  } satisfies TextStyle,

  bodySmall: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: colors.moss,
  } satisfies TextStyle,

  caption: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.moss,
  } satisfies TextStyle,

  tabActive: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    color: colors.lavender,
  } satisfies TextStyle,

  tabInactive: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.sage,
  } satisfies TextStyle,

  greeting: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.oliveDark,
  } satisfies TextStyle,

  inviteLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 2,
    color: colors.moss,
    textTransform: 'uppercase',
    textAlign: 'center',
  } satisfies TextStyle,

  age: {
    fontFamily: fonts.heading,
    fontSize: 32,
    letterSpacing: 1,
    color: colors.moss,
    textAlign: 'center',
  } satisfies TextStyle,

  eventDate: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    letterSpacing: 1,
    color: colors.oliveDark,
    textAlign: 'center',
  } satisfies TextStyle,

  eventLocation: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.moss,
    textAlign: 'center',
  } satisfies TextStyle,

  signupPrompt: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.moss,
  } satisfies TextStyle,

  signupLink: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.lavender,
  } satisfies TextStyle,

  button: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.white,
  } satisfies TextStyle,

  footerNote: {
    fontFamily: fonts.bodyItalic,
    fontSize: 12,
    color: colors.moss,
    textAlign: 'center',
  } satisfies TextStyle,

  brandSubtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.sage,
  } satisfies TextStyle,

  greetingSub: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.moss,
  } satisfies TextStyle,

  authorName: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.oliveDark,
  } satisfies TextStyle,

  postTime: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.moss,
  } satisfies TextStyle,

  postCaption: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.black,
  } satisfies TextStyle,

  adoreButton: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.oliveDark,
  } satisfies TextStyle,

  reactedLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.oliveDark,
  } satisfies TextStyle,

  reactionPickerTitle: {
    fontFamily: fonts.heading,
    fontStyle: 'italic',
    fontSize: 20,
    color: colors.oliveDark,
    textAlign: 'center',
  } satisfies TextStyle,

  reactionSummaryCount: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.moss,
  } satisfies TextStyle,

  reactionCount: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.moss,
  } satisfies TextStyle,

  uploadLabelMain: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.oliveDark,
    textAlign: 'center',
  } satisfies TextStyle,

  uploadLabelSub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.moss,
    textAlign: 'center',
  } satisfies TextStyle,

  fieldLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.oliveDark,
  } satisfies TextStyle,

  captionInput: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.oliveDark,
  } satisfies TextStyle,

  pillButton: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.white,
  } satisfies TextStyle,

  publishButton: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.white,
  } satisfies TextStyle,

  capsuleTitle: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.lavender,
  } satisfies TextStyle,

  capsuleDescription: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.oliveDark,
  } satisfies TextStyle,

  recordTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.oliveDark,
  } satisfies TextStyle,

  recordSub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.moss,
  } satisfies TextStyle,

  videosSectionTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.oliveDark,
  } satisfies TextStyle,

  videosCountBadge: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: colors.oliveDark,
  } satisfies TextStyle,

  videoEmptyTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.oliveDark,
    textAlign: 'center',
  } satisfies TextStyle,

  videoEmptySub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.moss,
    textAlign: 'center',
  } satisfies TextStyle,

  profileName: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    color: colors.oliveDark,
    textAlign: 'center',
  } satisfies TextStyle,

  profileHandle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.moss,
    textAlign: 'center',
  } satisfies TextStyle,

  statValueSage: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.sage,
    textAlign: 'center',
  } satisfies TextStyle,

  statValueLavender: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.lavender,
    textAlign: 'center',
  } satisfies TextStyle,

  statLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.moss,
    textAlign: 'center',
  } satisfies TextStyle,

  aboutTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.oliveDark,
  } satisfies TextStyle,

  aboutText: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: colors.moss,
  } satisfies TextStyle,

  logoutButton: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.moss,
  } satisfies TextStyle,

  authTitle: {
    fontFamily: fonts.heading,
    fontSize: 36,
    color: colors.oliveDark,
    textAlign: 'center',
  } satisfies TextStyle,

  authSubtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.sage,
    textAlign: 'center',
    textTransform: 'uppercase',
  } satisfies TextStyle,

  authNote: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.moss,
    textAlign: 'center',
  } satisfies TextStyle,

  authFieldLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.oliveDark,
  } satisfies TextStyle,

  authInput: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.oliveDark,
  } satisfies TextStyle,

  authHint: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.moss,
  } satisfies TextStyle,

  authPreviewText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.moss,
  } satisfies TextStyle,

  authPreviewHandle: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.lavender,
  } satisfies TextStyle,

  authFooter: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.moss,
  } satisfies TextStyle,

  authFooterLink: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.lavender,
    textDecorationLine: 'underline',
  } satisfies TextStyle,

  authForgotLink: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.lavender,
    textAlign: 'right',
  } satisfies TextStyle,
} as const;
