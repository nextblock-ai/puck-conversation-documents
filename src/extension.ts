// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as outputLogs from './utils/outputLog';
import * as chatEditorProvider from './providers/ChatEditorProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	outputLogs.activate(context);
	chatEditorProvider.activate(context);

}

// This method is called when your extension is deactivated
export function deactivate() {}
