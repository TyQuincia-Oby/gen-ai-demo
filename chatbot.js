onEvent("sendBtn", "click", function() {
    //console.log to make sure button is clicked
    console.log("sendBtn clicked!");

    //getValue from user-input or (direct DOM) to confirm input value is being read correctly
    let userQuestion = getValue("user-input");
    console.log(userQuestion);
    // confirmed question pops up in console

        if (userQuestion === "") {
        setText("output-text", "Please enter a message");
    }
    
    //setText to display "Test Message" in output-text
    setText("output-text", "");

});