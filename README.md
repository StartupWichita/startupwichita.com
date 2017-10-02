 ![Our sweet logo designed by Dominic Flask](http://www.startupwichita.com/assets/tophandlogo-02-4bd31d8d294b67de4cc32b2c5141d6a9.png?style="align:center")
  <h1>StartupWichita.com</h1>
<h4">Ruby on Rails application for communities, their news, events, and resources; built for what Wichita, Kansas needed in their tech and startup scene.</h4>
<br>
<p>Well, hello there. My name is [Kenton Hansen](http://startupwichita.com/profile/kenton-hansen). You might remember me from such works as <b>"Startup Weekend Wichita"</b> or <b>"The Labor Party."</b> Today, however, I'm here to talk about this web application started at a Hackathon in March 2014 with [devICT](http://devict.org).</p>
<br>
<p>The projects beta was completed and launched about three months later at [startupwichita.com](http://startupwichita.com), and we as a community have been contributing to its development since then.</p>

## Requirements

- ruby version 2.2.0
- ImageMagick or GraphicsMagick command-line tool (used in
  [minimagick](https://github.com/minimagick/minimagick) gem)
- bundler

## Installation and Setup

Clone the repo and `cd` into the directory.
```ruby
git clone https://github.com/StartupWichita/startupwichita.com.git
cd startupwichita
```
Then run ```ruby bundle install ```<br>
Run the mirgations ``` ruby rake db:migrate ```<br>
Start server ``` ruby rails s ```

<p><b>We use sqlite3 as database. Data seeding is also included in the migrations.</b></p>

## We would love for you to use this app for your community or to contribute:

### Pull requests generally

 - <b>The smaller the proposed change, the better.</b> If you’d like to propose two unrelated changes, submit two pull requests.
 - <b>The more information, the better.</b> Make judicious use of the pull request body. Describe what changes were made, why you made them, and what impact they will have for users.
 - Pull requests are easy and fun. If this is your first pull request, it may help to understand GitHub Flow.
 - If you’re submitting a code contribution, be sure to read the code contributions section below.
 
 ### Submitting a pull request via github.com
 1. Navigate to the file within StartupWichita/startupwichita.com that you’d like to edit.
 2. Click the pencil icon in the top right corner to edit the file
 3. Make your proposed changes
 4. Click “Propose file change”
 5. Click “Create pull request”
 6. Add a descriptive title and detailed description for your proposed change. The more information the better.
 7. Click “Create pull request”<br>
 
 <p><b>That’s it! You’ll be automatically subscribed to receive updates as others review your proposed change and provide feedback.</b></p>

 ### Submitting a pull request via Git command line
 1. Fork the project by clicking “Fork” in the top right corner of StartupWichita/startupwichita.com.
 2. Clone the repository locally <br>
 ```ruby git clone https://github.com/StartupWichita/startupwichita.com.git ```
 3. Create a new, descriptively named branch to contain your change <br> ``` ruby git checkout -b name_of_your_branch ```
 4. Push the branch up <br> ```ruby git push origin name_of_your_branch ```
 5. Create a pull request by visiting https://github.com/your-username/startupwichita.com and following the instructions at the top of the screen.
