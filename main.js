PennController.ResetPrefix()
DebugOff

Sequence("consent","background","instructions","practice-trial","experiment-intro",rshuffle("experiment-trial","filler"),SendResults(),"end")

// Welcome and Consent Form
newTrial("consent",
    defaultText
        .center()
        .print()
    ,
    newText('consent-1', 'Thank you very much for your participation!')
    ,
    newText('consent-2', '<p> This experiment is part of a Cornell University scientific research project. Your decision to participate is completely voluntary. There is no way for us to identify you. The only information we will have, in addition to your responses, is the time at which you completed the survey. The results of the research may be presented at scientific meetings or published in scientific journals.')
    ,
    newText('consent-3', '<p> Clicking on the link below indicates that you are at least 18 years of age and agree to complete this experiment voluntarily.')
    ,
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
)   

//Participant background
newTrial("background",
    defaultText
        .center()
        .print()
    ,
    newText("bg-intro", "First, we will collect some background information from you. As a reminder, you will remain completely anonymous.")
    ,
    newText("L1", "<p>Are you a native speaker of English? Please click on your answer below."),
    newText(" "),
    newText("y", "Yes"),
    newText(" "),
    newText("n", "No"),
    newText(" "),
    newSelector("L1-selector")
    .add(getText("y"), getText("n"))
    .wait()
    .log()
    ,
    newText("dialect", "<p>If you speak a dialect of English, please type it below and hit Enter.")
    ,
    newTextInput("dialect-input")
        .center()
        .log()
        .print()
        .wait()
    ,
    newText("age", "<p>Please type your age below (as a number) and hit Enter.")
    ,
    newTextInput("age-input")
        .center()
        .log()
        .print()
        .wait()
)

//Instructions
newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1",  'Rate each item in terms of its acceptability on a scale from 1–5, with a 5 rating meaning that the sentence is perfectly acceptable in English and that you can imagine yourself or other native speakers saying it')
    ,
    newText('instructions-2', '<p>First, you will be presented with some sample questions to practice making acceptability judgments.')
    ,
    newText(" "),
    newButton('continue2', 'Continue')
        .center()
        .size(200, 30)
        .print()
        .wait()
    )

//Practice questions
Template("sample-items.csv", row =>
    newTrial("practice-trial",
        defaultText
            .center()
            .print()
        ,
        newController("accept-practice",'AcceptabilityJudgment',
            {q: "How good/bad is the sentence?"
            ,
            s: row.sentence
            ,
            as: ['1', '2', '3', '4', '5']
            ,
            leftComment:"very bad"
            ,
            rightComment:"very good"
            ,
            presentAsScale: true})
            .center()
            .print()
            .wait()
        ,
        newText(" "),
        newText("feedback", row.feedback),
        newText(" "),
        newButton("Next")
            .center()
            .size(200, 30)
            .print()
            .wait("first")
    )
)

//Introduce experiment
newTrial("experiment-intro",
    defaultText
    .center()
    .print()
    ,
    newText("The practice questions are over now!"),
    newText("<p>The experiment will begin when you click the button."),
    newButton('continue3', "Continue")
    .center()
    .size(200, 30)
    .print()
    .wait()
)

//Template: Test items
Template("expt-02-items.csv", variable =>
    newTrial("experiment-trial",
        defaultText
            .center()
            .print()
        ,
        newController("accept-trial",'AcceptabilityJudgment',
            {q: "How good/bad is the sentence?"
            ,
            s: variable.Sentence
            ,
            as: ['1', '2', '3', '4', '5']
            ,
            leftComment:"very bad"
            ,
            rightComment:"very good"
            ,
            presentAsScale: true})
                .center()
                .log()
                .print()
                .wait()
    )

    //.log("target_group",variable.Group)
    .log("target_item",variable.Item)
    .log("target_variant", variable.Variant)
    .log("target_sentence", variable.Sentence)
    .log("target_voice.cl1",variable.Clause1)
    .log("target_voice.cl2",variable.Clause2)
)

//Template: Fillers
Template("fillers.csv", variable =>
    newTrial("filler",
        defaultText
            .center()
            .print()
        ,
        newController("accept-filler",'AcceptabilityJudgment',
            {q: "How good/bad is the sentence?"
            ,
            s: variable.Sentence
            ,
            as: ['1', '2', '3', '4', '5']
            ,
            leftComment:"very bad"
            ,
            rightComment:"very good"
            ,
            presentAsScale: true})
                .center()
                .log()
                .print()
                .wait()
    )    
    .log("filler_item", variable.Item)
    .log("filler_type", variable.Type)
    .log("filler_sentence", variable.Sentence)
)

//Completion Screen
newTrial("end",
    newText("Thank you for participation! You may now exit this window.")
        .center()
        .print()
    ,
    newButton().wait()
)

//.setOption("countsForProgressBar",false)