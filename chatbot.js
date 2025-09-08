let botReply = "";
onEvent("sendBtn", "click", function() {
    //console.log to make sure button is clicked
    console.log("sendBtn clicked!");

    //getValue from user-input or (direct DOM) to confirm input value is being read correctly
    let userQuestion = getValue("user-input");
    console.log(userQuestion);
    // confirmed question pops up in console

        if (userQuestion === "") {
        setText("output-text", "Please enter a message");
         //setText to output-text to display userQuestion
    }
    else {
       
        setText("output-text", "Thinking...");
        // confirmed output-text displays correctly in browser
    }
    sendToModel();
});

function sendToModel() {
    console.log("sendToModel called");
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
            content: "How do I make guacamole?",
        },
    ],
    model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
}).then((response) => {
    console.log(JSON.stringify(response));
    botReply = response.choices[0].message.content;
    console.log("Bot reply:", botReply);
});
};

