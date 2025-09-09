let botReply = "";
let userPrompt = "";
let userQuestion = "";

onEvent("sendBtn", "click", function() {
    //console.log to make sure button is clicked
    console.log("sendBtn clicked!");

    //getValue from user-input or (direct DOM) to confirm input value is being read correctly
    userQuestion = getValue("user-input");

        if (userQuestion === "") {
        setText("output-text", "Please enter a message");
         //setText to output-text to display userQuestion
    }
    else {
       
        setText("output-text", "Thinking...");
        console.log("Thinking...");
        // confirmed output-text displays correctly in browser
    }
    
    sendToModel();
    //calls sendToModel function
    console.log("Sending Prompt:", userQuestion);
});

function sendToModel() {
    console.log("sendToModel called");
    //sendToModel called in console
    
    async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ 
    messages: [
        {
            role: "user",
            content: userQuestion,
        },
    ],
    model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
}).then((response) => {
    console.log(JSON.stringify(response));
    botReply = response.choices[0].message.content;
    console.log("Bot reply:", botReply);
    setText("output-text", botReply);
});
};

