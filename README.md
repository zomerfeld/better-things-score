## How do I run this thing?

You'll need node installed.  Then, from the directory you've cloned this
project to type `node server`.  The app will be accessible at

`http://localhost:3000/weighting`

`http://localhost:3000/results`

on Heroku use these links:

`https://better-things-score.herokuapp.com/weighting`

`https://better-things-score.herokuapp.com/results`


## How do I change the data.

The question data is in `questions.json`, the product data is in
`products.json`.

## How do I change the styles?

All the css is `better-things.css`.  The top of the file is a reset.

The bulk of the survey page is targeted via the `question-viewer` and
`question` classes.

The results page is targeted by the `results` and `badge` classes.
