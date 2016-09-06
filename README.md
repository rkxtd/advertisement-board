# Very Limited Advertisement Board

This is VLAB project. You could use it to sell own junk.

## Overview


## How to run it

1. cd into project directory and run `npm install`
2. change client's `config app/config.js` particulary apiUrl section to point to API server with endpoint base address without trailing slash
3. Build the project: `npm run build`
4. `cd server`
5. `composer install`
6. upload database dump from `dump/dump.sql` to mysql server
7. Configure mysql access in file `server/config.php`
8. start the apache or nginx web-server and point it to `./public` directory
9. Open website