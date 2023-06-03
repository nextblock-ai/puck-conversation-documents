import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function loadStyle(webview: vscode.Webview, extensionUri: vscode.Uri, libName: string) {
    const libPath = vscode.Uri.joinPath(extensionUri, libName);
    let libContent = fs.readFileSync(libPath.fsPath, 'utf8'); 

    // Replace the font paths in the CSS
    if (libName === 'resources/css/font-awesome.min.css') {
        const webfontsPath = vscode.Uri.joinPath(extensionUri, 'resources', 'fonts');
        libContent = libContent.replace(/url\((?:['"])?([^'"]+)(?:['"])?\)/g, (match: string, url: string) => { 
            const fontPath = path.join(webfontsPath.fsPath, url);
            // const fontUri = webview.asWebviewUri(vscode.Uri.file(fontPath));
            return `url('${fontPath}')`;
        });
    }

    return `<style>${libContent}</style>`;
}