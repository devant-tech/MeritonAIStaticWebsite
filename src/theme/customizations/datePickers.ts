import { alpha, Theme } from '@mui/material/styles';
import type { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';
import { pickersDayClasses } from '@mui/x-date-pickers';
import { gray, brand } from './themePrimitives';

export const datePickersCustomizations: PickerComponents<Theme> = {
    MuiPickersArrowSwitcher: {
        styleOverrides: {
            spacer: { width: 16 },
            button: ({ theme }) => ({
                backgroundColor: 'transparent',
                color: (theme.vars || theme).palette.grey[500],
                ...theme.applyStyles('dark', {
                    color: (theme.vars || theme).palette.grey[400]
                })
            })
        }
    },
    MuiPickersCalendarHeader: {
        styleOverrides: {
            switchViewButton: {
                padding: 0,
                border: 'none'
            }
        }
    },

    MuiPickersDay: {
        styleOverrides: {
            root: ({ theme }) => ({
                fontSize: theme.typography.body1.fontSize,
                color: (theme.vars || theme).palette.grey[600],
                padding: theme.spacing(0.5),
                borderRadius: theme.shape.borderRadius,
                '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.action.hover
                },
                [`&.${pickersDayClasses.selected}`]: {
                    backgroundColor: gray[700],
                    fontWeight: theme.typography.fontWeightMedium
                },
                '&:focus': {
                    outline: `3px solid ${alpha(brand[500], 0.5)}`,
                    outlineOffset: '2px',
                    backgroundColor: 'transparent',
                    [`&.${pickersDayClasses.selected}`]: {
                        backgroundColor: gray[700]
                    }
                },
                ...theme.applyStyles('dark', {
                    color: (theme.vars || theme).palette.grey[300],
                    '&:hover': {
                        backgroundColor: (theme.vars || theme).palette.action
                            .hover
                    },
                    [`&.${pickersDayClasses.selected}`]: {
                        color: (theme.vars || theme).palette.common.black,
                        fontWeight: theme.typography.fontWeightMedium,
                        backgroundColor: gray[300]
                    },
                    '&:focus': {
                        outline: `3px solid ${alpha(brand[500], 0.5)}`,
                        outlineOffset: '2px',
                        backgroundColor: 'transparent',
                        [`&.${pickersDayClasses.selected}`]: {
                            backgroundColor: gray[300]
                        }
                    }
                })
            })
        }
    }
};
