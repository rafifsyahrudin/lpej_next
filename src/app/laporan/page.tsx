"use client"

import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, FilledTextFieldProps, FormControl, FormControlLabel, Grid, Input, InputLabel, Link, OutlinedTextFieldProps, Paper, Stack, StandardTextFieldProps, TextField, TextFieldVariants, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import { JSX, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { MenuButtonBold, MenuButtonItalic, MenuControlsContainer, MenuDivider, MenuSelectHeading, RichTextEditor, RichTextEditorRef } from "mui-tiptap";
import StarterKit from "@tiptap/starter-kit";

export default function Page() {
    const [laporan, setLaporan] = useState<{ tanggal?: Date, kegiatan?: string, rincianKegiatan?: string }[]>([{}])
    const rteRef = useRef<RichTextEditorRef>(null)

    return (
        <>
            <Paper sx={{
                p: 2,
                m: 2
            }}>
                {laporan.map((_, i) => (
                    <Box component="form" noValidate sx={{ mt: 3, p: 2 }} border='1px solid grey' borderRadius={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker label="Tanggal" value={laporan[i].tanggal} onChange={(e: any) => {
                                        const newLaporan = laporan.slice()
                                        newLaporan[i] = {
                                            ...laporan[i],
                                            tanggal: e
                                        }
                                        setLaporan(newLaporan)
                                    }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="kegiatan"
                                    label="Kegiatan"
                                    name="kegiatan"
                                    autoComplete="kegiatan"
                                    value={laporan[i].kegiatan}
                                    onChange={(e) => {
                                        const newLaporan = laporan.slice()
                                        newLaporan[i] = {
                                            ...laporan[i],
                                            kegiatan: e.target.value
                                        }
                                        setLaporan(newLaporan)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RichTextEditor
                                    ref={rteRef}
                                    content="" // Initial content for the editor
                                    extensions={[StarterKit]}
                                    // Optionally include `renderControls` for a menu-bar atop the editor:
                                    renderControls={() => (
                                        <MenuControlsContainer>
                                            <MenuSelectHeading />
                                            <MenuDivider />
                                            <MenuButtonBold />
                                            <MenuButtonItalic />
                                            {/* Add more controls of your choosing here */}
                                        </MenuControlsContainer>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <Stack direction='row' justifyContent='space-between'>
                    <Button variant="contained" startIcon={<AddIcon />} sx={{
                        mt: 2
                    }} onClick={() => {
                        setLaporan((oldV) => [...oldV, { }])
                    }}>
                        Tambah Laporan Lainnya
                    </Button>
                    <Button color="success" variant="contained" startIcon={<SaveIcon />} sx={{
                        mt: 2
                    }} onClick={() => {
                        console.log(laporan)
                    }}>
                        Simpan
                    </Button>
                </Stack>
            </Paper>
        </>
    )
}