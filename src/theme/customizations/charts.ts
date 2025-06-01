import { Theme } from '@mui/material/styles';
import { axisClasses, legendClasses, chartsGridClasses } from '@mui/x-charts';
import type { ChartsComponents } from '@mui/x-charts/themeAugmentation';
import { gray } from './themePrimitives';

/**
 * Chart Customization Configuration
 * Defines the styling and theming for all chart components
 * Supports both light and dark themes
 */
export const chartsCustomizations: ChartsComponents<Theme> = {
    // Axis customization for better readability and visual appeal
    MuiChartsAxis: {
        styleOverrides: {
            root: ({ theme }) => ({
                // Axis line styling
                [`& .${axisClasses.line}`]: {
                    stroke: gray[300]
                },
                // Tick marks styling
                [`& .${axisClasses.tick}`]: { stroke: gray[300] },
                // Tick label styling
                [`& .${axisClasses.tickLabel}`]: {
                    fill: gray[500],
                    fontWeight: 500
                },
                // Dark theme overrides
                ...theme.applyStyles('dark', {
                    [`& .${axisClasses.line}`]: {
                        stroke: gray[700]
                    },
                    [`& .${axisClasses.tick}`]: { stroke: gray[700] },
                    [`& .${axisClasses.tickLabel}`]: {
                        fill: gray[300],
                        fontWeight: 500
                    }
                })
            })
        }
    },

    // Tooltip customization for better data point interaction
    MuiChartsTooltip: {
        styleOverrides: {
            // Tooltip marker styling
            mark: ({ theme }) => ({
                ry: 6, // Rounded corners
                boxShadow: 'none',
                border: `1px solid ${(theme.vars || theme).palette.divider}`
            }),
            // Tooltip table styling
            table: ({ theme }) => ({
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                background: 'hsl(0, 0%, 100%)',
                // Dark theme overrides
                ...theme.applyStyles('dark', {
                    background: gray[900]
                })
            })
        }
    },

    // Legend customization for better chart readability
    MuiChartsLegend: {
        styleOverrides: {
            root: {
                // Legend marker styling
                [`& .${legendClasses.mark}`]: {
                    ry: 6 // Rounded corners for legend markers
                }
            }
        }
    },

    // Grid customization for better visual structure
    MuiChartsGrid: {
        styleOverrides: {
            root: ({ theme }) => ({
                // Grid line styling
                [`& .${chartsGridClasses.line}`]: {
                    stroke: gray[200],
                    strokeDasharray: '4 2', // Dashed lines
                    strokeWidth: 0.8
                },
                // Dark theme overrides
                ...theme.applyStyles('dark', {
                    [`& .${chartsGridClasses.line}`]: {
                        stroke: gray[700],
                        strokeDasharray: '4 2',
                        strokeWidth: 0.8
                    }
                })
            })
        }
    }
};
