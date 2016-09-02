# Very Limited Advertisement Board

This is VLAB project. You could use it to sell own junk.

## Overview


## How to run it

1. cd into project directory and run `npm install`
2. Build the project: `npm run build`
3. `cd server`
4. `composer install`
5. upload database dump from `dump/dump.sql` to mysql server
6. Configure mysql access in file `server/config.php`
7. start the apache or nginx web-server and point it to `./public` directory
