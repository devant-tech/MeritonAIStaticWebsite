// import MaterialTable from '@components/MaterialTable';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import StatCard, { StatCardProps } from './StatCard';
import HighlightedCard from './HighlightedCard';

function renderStatus(status: 'Online' | 'Offline') {
    const colors: { [index: string]: 'success' | 'default' } = {
        Online: 'success',
        Offline: 'default'
    };

    return <Chip label={status} color={colors[status]} size="small" />;
}

const data: StatCardProps[] = [
    {
        title: 'Users',
        value: '14k',
        interval: 'Last 30 days',
        trend: 'up',
        data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360,
            340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460,
            600, 880, 920
        ]
    },
    {
        title: 'Conversions',
        value: '325',
        interval: 'Last 30 days',
        trend: 'down',
        data: [
            1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820,
            840, 600, 820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520,
            480, 400, 360, 300, 220
        ]
    },
    {
        title: 'Event count',
        value: '200k',
        interval: 'Last 30 days',
        trend: 'neutral',
        data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530,
            620, 510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420,
            510, 430, 520, 510
        ]
    }
];

export default function Home() {
    const columns: GridColDef[] = [
        {
            field: 'pageTitle',
            headerName: 'Page Title',
            flex: 1.5,
            minWidth: 200
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.5,
            minWidth: 80,
            renderCell: (params) => renderStatus(params.value as any)
        },
        {
            field: 'users',
            headerName: 'Users',
            headerAlign: 'right',
            align: 'right',
            flex: 1,
            minWidth: 80
        }
    ];
    const rows = [
        {
            id: 1,
            pageTitle: 'Homepage Overview',
            status: 'Online',
            eventCount: 8345,
            users: 212423,
            viewsPerUser: 18.5,
            averageTime: '2m 15s',
            conversions: [
                469172, 488506, 592287, 617401, 640374, 632751, 668638, 807246,
                749198, 944863, 911787, 844815, 992022, 1143838, 1446926,
                1267886, 1362511, 1348746, 1560533, 1670690, 1695142, 1916613,
                1823306, 1683646, 2025965, 2529989, 3263473, 3296541, 3041524,
                2599497
            ]
        },
        {
            id: 2,
            pageTitle: 'Product Details - Gadgets',
            status: 'Online',
            eventCount: 5653,
            users: 172240,
            viewsPerUser: 9.7,
            averageTime: '2m 30s',
            conversions: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 557488, 1341471, 2044561, 2206438
            ]
        },
        {
            id: 3,
            pageTitle: 'Checkout Process - Step 1',
            status: 'Offline',
            eventCount: 3455,
            users: 58240,
            viewsPerUser: 15.2,
            averageTime: '2m 10s',
            conversions: [
                166896, 190041, 248686, 226746, 261744, 271890, 332176, 381123,
                396435, 495620, 520278, 460839, 704158, 559134, 681089, 712384,
                765381, 771374, 851314, 907947, 903675, 1049642, 1003160,
                881573, 1072283, 1139115, 1382701, 1395655, 1355040, 1381571
            ]
        }
    ];
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Overview
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {data.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard {...card} />
                    </Grid>
                ))}
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <HighlightedCard />
                </Grid>
                {/* <Grid size={{ xs: 12, md: 6 }}>
                    <SessionsChart />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <PageViewsBarChart />
                </Grid> */}
            </Grid>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Details
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <DataGrid
                        checkboxSelection
                        rows={rows}
                        columns={columns}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0
                                ? 'even'
                                : 'odd'
                        }
                        initialState={{
                            pagination: { paginationModel: { pageSize: 20 } }
                        }}
                        pageSizeOptions={[10, 20, 50]}
                        disableColumnResize
                        density="compact"
                        slotProps={{
                            filterPanel: {
                                filterFormProps: {
                                    logicOperatorInputProps: {
                                        variant: 'outlined',
                                        size: 'small'
                                    },
                                    columnInputProps: {
                                        variant: 'outlined',
                                        size: 'small',
                                        sx: { mt: 'auto' }
                                    },
                                    operatorInputProps: {
                                        variant: 'outlined',
                                        size: 'small',
                                        sx: { mt: 'auto' }
                                    },
                                    valueInputProps: {
                                        InputComponentProps: {
                                            variant: 'outlined',
                                            size: 'small'
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, lg: 3 }}>
                    <Stack
                        gap={2}
                        direction={{ xs: 'column', sm: 'row', lg: 'column' }}
                    >
                        {/* <CustomizedTreeView />
                        <ChartUserByCountry /> */}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
