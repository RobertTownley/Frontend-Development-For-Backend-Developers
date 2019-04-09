#Introduction
Hi everyone. How's it going? I'm asking collectively. Obviously I don't have time right now to ask you all individually,
so I've got to settle for a weird, collective "Woo" noise and applause.

But you know what? That woo noise is important too. The overall mood of the room, the elasticity of your collective
minds, the total amount of caffeine you've all consumed today... those are every bit as important as the content of what I'll be talking about today.
Next week, we'll all be back at work and your colleagues will ask you how your conference went, and you'll say
"Well there was this American guy who made a few jokes about cowboys, and said some stuff about frontend development"
They probably won't care much about the cowboy stuff, but they'll ask about the frontend stuff. And when they do,
whatever you've retained will be because you agreed, through the verbal contract known as a "Woo" noise, to gift me with
your attention.

That is a vote of confidence that I'll be able to give you something useful over the next half hour, and I promise that
I'll try my best to do so.

## My Background
Now, maybe some of you have traveled from far away to learn about frontend development from a seasoned wizard of frontend development.
You came to my talk because you heard that I know the intricacies of transpilation like the back of my hand; that I can
write advanced webpack configurations in my sleep; that I regularly offer advice the core contributors of React, Vue, AND Angular on
best practices. You came here because you want to be the best, and to do that you want to learn from the best.

If that's the case, you... are about to be extremely disappointed, because I'm not the best frontend developer in the
world. In fact, I'm probably not the best frontend developer in the room.

Before becoming a Django developer, I worked with PHP for years. Learning Django felt like having something
fundamental fall into place. The Model-Template-View architecture made total sense. The ORM was so much better than
writing raw SQL. I had something resembling peace of mind when it came to database migrations. This better way of doing
things just clicked.

It wasn't like that years later when I was bashing my head against React tutorials month-after-month. Smart people, who
I trusted, were telling me that this was a better way, but I just couldn't see it. What was wrong with jQuery? Why did I
need this whole other ecosystem with 10 different libraries that were only useful when used together? Would going down
this road mean that I needed to give up Django and become a Node developer?

I'm not the world's foremost authority on frontend development, but after years of listening to people smarter than me,
I have answers to those questions. There's nothing wrong with jQuery. You don't have to jump into an unfamiliar
ecosystem just to get better at this. And you definitely don't have to give up Django.

## Will Rogers
Today we're going to talk about ways to integrate some frontend tools into your Django projects. As we do so, I'm also going to introduce you to a man named Will Rogers.

Last year, I married the love of my life. We met in Washington DC, but she's originally from Tulsa, Oklahoma, which, if
you're looking at a map of the United States, is directly in the middle.

The airport in Tulsa, Oklahoma is named after Oklahoma's most famouse native son, Will Rogers. Not to be confused with Fred Rogers,
the host of Mr. Roger's Neighborhood, Will Rogers was a cowboy, and a performer in the early 1900s. He did tricks while riding a horse,
twirled around a lasso, and shared insightful quotes.

## The Application
Today, we're going to learn a bit about frontend development by taking an app that serves up Will Rogers quotes, and
incrementally improving it with some modern tools and techniques.

The django project itself is pretty simple. It has one app, called `quotes` which contains a model, a view that serves up that
model, and an admin page that lets users add, remove or edit quotes.

The view is a templateview that serves up the app's one template. The template itself makes references to three static
assets: a custom CSS file that makes our app look a little better, a Javascript file for user interactions, and a link
to a CDN-hosted jQuery.

Finally, there's a Django Rest Framework serializer that we'll be using a bit later once we decide to over-engineer this app even further.

## Level 0: The app is perfect
One thing that I want to be clear about before we get going: this app is fine as-is. It doesn't need a frontend
package manager, or a transpiler, or a build process. And that's not just because this is a rudamentary demo app; a lot
of the websites you'll be dealing with out there in the real world don't need these tools either. They're added
complexity. They take up space in your brain when you're trying to conceptualize how your application works. And that
mental overhead might not be worth it. Deciding the right tools for the job is part of being a developer. What follows
are insights into those tools so you can make an informed decision about whether or not they're worth it.

## Level 1: NPM
The first thing we're going to do for our app is add a frontend package manager.
### What is it?
NPM stands for the "Node Package Manager". Node is the runtime environment that makes backend javascript possible. It's
pretty directly comparable to `pip` in the Python world, in that it's used to manage all of the external libraries used
by our project. For that reason, I think Django developers have an easy time understanding the value of adding this to
your project. If your only frontend dependency is jQuery, then you might not need this, but if you're using `moment.js`
for time, and `tween.js` for animation, and `axios` for making asyncronous requests, then keeping track of these
libraries and their versions in a file makes just as much sense as maintaining a `requirements.txt` file.

### How do you use it?
To get started with it, you have to have an up-to-date version of node installed on your computer or
server, and then you initialize it with `npm init`. From then on, any commands you run to install libraries are
contained in `package.json` and `package-lock.json` files. You don't have to run the equivalent of `pip freeze` because dependencies and development dependencies are automatically saved to the `package.json` file.

The command also creates a folder called `node_modules` which contains the actual files you're downloading through the
package manager.

### Putting it into our project
So let's add a few dependencies to our project. First, we know that we're using jQuery, so we'll install that by running
`npm install jquery`. Once that finishes downloading, you can see that our package.json has been modified.

Let's also add another library, `normalize.css`. Normalize.css is a CSS reset library that's useful for restoring
sensible defaults across different browsers, and unsetting all the weird spacing differences that might take place
between them. To install it, we run `npm install normalize.css`

Looking inside of `node_modules` we can see that there are now two directories there, and our dependencies are ready to
be referenced elsewhere.

I'm going to show you a quick and dirty way of getting these files into your Django project. Once you know how to use
WebPack, there are better ways of doing this, but I found this step to be a helpful and incremental introduction to the
world of NPM: we're going to declare `node_modules` to be a static directory within our project.

So within our settings.py, we declare `node_modules` as a non-app Static file directory. This means that everything in
`node_modules` is going to be copied over as part of `collectstatic`. If we have two or three dependencies, that's no
big deal. If we have hundreds, that can slow down deployments and take up hard disk space. So my advice is, use this
step if it helps you in the short term, but reconsider it when you start managing tons of frontend dependencies.

But, having done this, we can now reference files in `node_modules` from within our templates. This means we can replace
the CDN-hosted jQuery with our own if we want to, and we can add in normalize.css.

And with that, we're now tracking our frontend dependencies with the same diligence and attention to detail that we do
on the backend. Yay!

## Level 2: CSS Preprocessors
Next up, let's take a look at our custom CSS file, and see if we can improve that.

The file is pretty basic. It's totally manageable as-is, and anything we do to it would be overkill. But maybe you can imagine
a larger CSS file that's gotten out-of-hand, or maybe you already have one in mind from your own life.

### What is it?
A CSS preprocessor is a program that takes in a file format that it knows about, like Less or Scss, and returns valid
CSS. In doing so, we can improve the capabilities and legibility of our CSS while ending up with a file that's similar
to, or even better than, a CSS file we write ourselves. This is useful for several reasons:
- We can nest CSS selectors within each other
- We can use a nicer variable syntax
- We have an easy way of minifiy our files if we want to
- We can import from other files, or make use of mixins
- It gets us used to the idea of some static assets being the result of processes, rather than things we put into tags
  and forget about.

### How do you use it?
First, install Scss on your computer. You can do so through global NPM commands, or through global ruby commands,
whichever you prefer.

After that, you can run the command scss {{ infile }} {{ outfile }}. You can add different flags to minimize the output,
or even set up a watch server that automatically recreates the CSS file whenever you save a Scss file.

## Level 3: Browsersync
Ideally, your SCSS to CSS pre-processor step shouldn't change much about your site (with the possible exception of
faster load times). This next tool is the same way: you'll never know it was used when on production, and it's just
there to make your development process faster and more iterative.

BrowserSync is another program that you install on your computer. When you have it running, you can tell it to create a
proxy server that mirrors your django runserver. Visiting the port that browsersync is running (rather than the one
Django is running) gives you something identical to `localhost:8000` but with listeners on CSS files. When those files
are changed (either by us or by a CSS preprocessor) the page updates with those CSS rules automagically. This is really
nice when trying to write CSS. We can iterate more quickly if we don't have to click and await page reloads after every
change. 

Let's see it in action on our project.

This is sometimes referred to as "Hot Module Reloading", a term for the development practice whereby a browsersync
process listening for changes to static assets makes iterative development easier and more productive.

### Level 4: Webpack
One thing that always used to bother me about writing javascript "The Old Way" was the global declaration of variables.
If I want to break my code into multiple files, I need to write my code with the ordering of script tags in
mind, rather than breaking apart functions based on what makes sense.

In Python, everything that a file is going to use has to be imported in that file. Our imports become an authoritative,
trustworthy source of truth on where different code is being used. If we're not sure if a library is in use, we can
search our code for the imports. 

If all of your code is built out with Javascript imports, managed and bundled through webpack, you get the same peace of
mind. You no longer have to worry about breaking something when moving around script tags, because your Javascript files
become independent resources that contain everything they need.

Webpack also helps with managing the different tools you might use in your project (Scss, babel, browsersync, UI libraries...).
If you're sold on the idea of hot module reloading, and if you like running Scss with a --watch flag, and if you're
running your Django runserver, and if you want to create optimized crops of image resources... your terminal might be looking a bit hectic.






He was a kind man. He was funny. He cared about people. He cared about ideas, mental models, and the quality of thought. He
cared about learning, and didn't care where that learning came from.
So I thought of him when it came time to plan this talk, since I'm a strange choice to be teaching a room full of smart
people about frontend development.






And his unique brand of empathetic, thoughtful, sometimes self-deprecating humor is less common than it should be.

In preparation for this talk, I made a Will Rogers quote application. It's a super basic Django application that serves
up a random Will Rogers quote. 



When I was thinking of applications today, we're going to take a Will Rogers quote application, and give it 





Since we started dating, I've learned more about Tulsa Oklahoma than I ever thought I would. One of my favorite things

But first, I promised you some cowboy stuff.

Last year, I married a woman from Tulsa, Oklahoma.

I'd like to start things off by introducing you all to a cowboy.

## Thank you
Thank you all for taking time out of your schedules and lives to hear me speak. It's a vote of confidence in me that
I'll be able to teach you something useful, and I promise that I'll try my best to do so.

This is my first time speaking at a conference, 

