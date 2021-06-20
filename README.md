# iTunes song list React App

This project is an application that lists the first 50 songs of an artist/group from the iTunes store using the iTunes public API.

## Requirements

The Application is organized in this way:
● A single page with the songs list from that artist/group.
● The page title (document in JS) must be the artist/group name.
● The page must contain an input field and a "search button".
● In the text input you can insert the name of the artist/group.
● The search button should make a new call to iTunes with the artist/group contained in the input field.
● Each element of the list must contain the following elements:
    ○ song name
    ○ album name
    ○ the album image or a generic icon if the image doesn’t exist
● The API call must be done only in these cases:
○ on the first launch (choose a default value for the input field)
    ○ when the refresh button is pressed

## How to run it

Download the project and make sure you have installed latest version of Node.js (), then move to the folder by using its command prompt and use the following commands:

### `npm install --save`

This is needed to create the folder "node_modules" containing all the dependencies written in the file "package.json".

### `npm start`

This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Notes

In the file "song_api.js" I inserted some comments about how I used the iTunes public API.
I decided to disable the search button if the user inserts the same input twice in a row because the result would be identhical (it is possible to simply change one character to search again, in that case the result is slightly different, and then reinsert the previous value), unless the API call fails for a connection/server problem because in that case the input might be correct and the user can try again with same value later.
The API call is made with the library "axios".