import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("GEMINI_API_KEY not set");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const modelsToTest = [
    "gemini-2.0-flash-exp",
    "gemini-2.0-flash",
    "gemini-2.5-flash-image",
    "gemini-3-flash-preview",
    "gemini-3-pro-image-preview",
    "gemini-pro",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
];

async function testModel(modelName: string) {
    console.log(`\n🧪 Testing model: ${modelName}`);
    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: [
                {
                    role: "user",
                    parts: [{ text: "Hello, respond with just 'OK'" }],
                },
            ],
        });

        const text = response.text || "No text response";
        console.log(`✅ SUCCESS: ${modelName}`);
        console.log(`   Response: ${text.substring(0, 100)}`);
        return true;
    } catch (error: any) {
        console.log(`❌ FAILED: ${modelName}`);
        console.log(`   Error: ${error?.message || error}`);
        if (error?.status) {
            console.log(`   Status: ${error.status}`);
        }
        return false;
    }
}

async function main() {
    console.log("🚀 Testing Gemini API models...\n");
    console.log(`API Key: ${(apiKey || "").substring(0, 10)}...`);

    const results: Record<string, boolean> = {};

    for (const model of modelsToTest) {
        results[model] = await testModel(model);
        // Wait a bit between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("\n\n📊 RESULTS SUMMARY:");
    console.log("=".repeat(50));
    console.log("\n✅ Working models:");
    Object.entries(results).forEach(([model, worked]) => {
        if (worked) console.log(`   - ${model}`);
    });

    console.log("\n❌ Failed models:");
    Object.entries(results).forEach(([model, worked]) => {
        if (!worked) console.log(`   - ${model}`);
    });
}

main();
