import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

/**
 * Utility function for merging class names with Tailwind CSS
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Initialize STL exporter
const exporter = new STLExporter();

/**
 * Exports a 3D mesh to an STL file
 * @param mesh - The THREE.js mesh to export
 * @param output - The name of the output file
 * @param binary - Whether to export as binary STL (true) or ASCII STL (false)
 */
export const exportSTL = (mesh: THREE.Mesh, output: string, binary = true) => {
    // Convert mesh to STL format
    const content = exporter.parse(mesh, { binary });

    // Create a blob from the STL data
    const blob = new Blob([content], { type: 'model/stl' });

    // Create a temporary URL for the blob
    const url = URL.createObjectURL(blob);

    // Create and trigger download link
    const link = document.createElement('a');
    link.href = url;
    link.download = output;
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
};

export const uploadSTL = async (): Promise<string> =>
    new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) {
                reject(new Error('No file selected'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target?.result as string);
            };
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        };

        input.click();
    });
