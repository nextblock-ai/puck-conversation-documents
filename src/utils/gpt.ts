/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { sendQuery } from './core';

export interface GPTChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
export interface GPTChatConversation {
    model: string;
    messages: GPTChatMessage[];
    max_tokens?: number;
    top_p?: number;
    temperature?: number;
    stream?: boolean;
    apikey?: string;
}

const persomDelimiter = "👤";
const assistantDelimiter = "🤖";
const systemDelimiter = "🌐";

export async function sendChatQuery(messages: any[], prompt: string, inputText: string): Promise<GPTChatMessage[]> {

    const conversation = {
        messages: [] as any[],
        model: "gpt-4",
        temperature: 1,
        max_tokens: 2048,
    };

    const addToMessages = (role: string, content: string) =>
        conversation.messages.push({ role, content });
    const updates = [];


    // add the existing messages to the conversation object
    if (messages.length > 0) {
        if (messages && messages.length > 0) {
            conversation.messages = messages;
            addToMessages("user", inputText);
        }

    } else {
        addToMessages("system", prompt);
    }
    
    // add the user message to the conversation object
    if(inputText) {
        addToMessages("user", inputText);
    }

    conversation.messages = conversation.messages.map(c => ({
        content: c.content,
        role: c.role === systemDelimiter 
            ? "system" : c.role === persomDelimiter 
                ? "user" : c.role === assistantDelimiter 
                    ? "assistant" : c.role
    }));

    // send the query to the GPT API
    const result = await sendQuery(conversation);

    // add the response to the conversation object
    addToMessages("assistant", result);

    // return the conversation object
    return conversation.messages;

}
