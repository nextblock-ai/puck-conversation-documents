import * as vscode from "vscode";

// 🦄

let coreApi: any;
const coreExtension = vscode.extensions.getExtension("NextBlock.puck-core");
if(coreExtension) { coreApi = coreExtension.exports; }

export async function sendQuery(req: any) {
    return coreApi.core.sendRequest(req);
}

export async function getApiKey() {
    return coreApi.core.getApiKey();
}

export async function streamQuery(req: any, onUpdate: any, onFinish: any) {
    return coreApi.core.streamRequest(req, onUpdate, onFinish);
}

export async function getSemanticAgent() {
    return coreApi.SemanticAgentProvider.getInstance().createSemanticAgent();
}