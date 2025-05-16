import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const exporter = new STLExporter();

export const exportSTL = (mesh: THREE.Mesh, output: string, binary = true) => {
    const content = exporter.parse(mesh, { binary });
    const blob = new Blob([content], { type: 'model/stl' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = output;
    link.click();

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
