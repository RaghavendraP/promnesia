[![CircleCI](https://circleci.com/gh/karlicoss/promnesia.svg?style=svg)](https://circleci.com/gh/karlicoss/promnesia)  

Has it ever occured to you that you were reading an old bookmark or some lengthy blog post and suddenly realized you had read it already before? It would be fairly easy to search in chrome history, however it is only stored locally for three months. 

Or perhaps you even have a habit of annotating and making notes elsewhere? And you wanna know quickly if you have the current page annotated and display the annotations.

Or you have this feeling that someone sent you this link ages ago, but you don't rememeber who and where.

Or you finally got to watch that thing it your 'Watch later' youtube playlist that's been there for three years, and now you want to know why did you add it in the first place.

Then this tool is for you.

It consists of two parts. On part is the extension itself that neatly displays the history in a sidebar. Second bit is the indexer and backend (which can absolutely run locally).

Indexer can run against:

* local sqlite history database backups
* Google Takeout/Activity backups
* Data exports from Hypothesis/Pocket/Instapaper/Reddit etc
* custom shell command 
* in general, anything that can be parsed and interacted with, it's pretty extensible

See more in [sources.md](sources.md).

# Demo 
![screenshot](https://user-images.githubusercontent.com/291333/69828210-3755ac80-121b-11ea-9d1e-e5086cc9feda.png)

- You can see that I sent the link to someone on telegram
- I've annotated the link on instapaper and highlights (yellow) are shown inline on the page
- I've also added link to my personal notes at some point, selected text was matched and highlighted as well

# Older demo (as of v 0.8)
![Demo screenshot](https://user-images.githubusercontent.com/291333/64424146-2bd16a00-d0a0-11e9-80d2-73cf3b2b60df.PNG)

Apologies for design, I'm not great at it :)

Some explanations:

* green eye indicates that the link was visited, so after you click it, you get the sidebar with more information
* Visits: I have this link added in my Pinboard, and visited it few times from different computers.
* Contexts

  * I chatted with some of my friends and sent them the link at some point. If I click the context, my Emacs will jump right at the point where the link was in the Telegram backup file. Json is clearly not the most convenient way to go through conversations with friends, but that's a matter of representing chats in a plaintext form. The benefit though is that once you have any sort of grepable source it's super easy to feed it into the plugin.
  * I had this link stored somewhere in my org mode notes in readlater.org file.
  * I also have this link annotated via [Hypothesis](https://hypothes.is/)!

# Configuring
* generator: TODO `cp config.py.example config.py`, edit config.py, run `python3 -m promnesia`
then, see the comments in the `config.py` for more information on using various history sources.
* extension: choose the generated JSON in the extension settings

# Running
To generate the URL database, run:

    ./generate
    
To use chrome extension, just 'load unpacked' on chrome://extensions/

# Dev dependencies

 * `npm install -g web-ext` for extension signing and Android testing
  * firefox dev edition (standard wouldn't let you install unsigned extensions)
  * `gechodriver`
 * `pip3 install pyautogui` for end to end tests


# TODOs
* [in progress] be more informative; show full history or at least last visit and potentially sources (e.g. hypothesis)
  * maybe icons for mobile/desktop?
* use some sort of smarter matching, e.g. no difference between http and https; normalise, remove trailing slash, etc, ignore some schemas/urls
  * use some python lib to extract normalised urls? there must be something.. however normalisation has to be simple enough, so JS site could use it too.
* handle url-decoding propely
* merge chrome db backups to avoid duplication
* update map daily/hourly?
* web service? so you don't have to carry the generated json file around
* better regex fox url extraction
eh, urls can have commas...  e.g. http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html
so, for csv need a separate extractor.
* describe why and what for each permission used
* timestamps seem wrong either in JS or in sqlite backup (most likely in sqlite)
* old temporary name: wereyouhere
