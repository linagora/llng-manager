# LemonLDAP::LG Manager

This project was made to provide a new interface for the LemonLDAP manager.

## Setup

To setup the necessary module for the manager, run `npm install`.

Install LemonLDAP instance using the [[tutorial]](https://lemonldap-ng.org/documentation/2.0/index_installation.html) and replace the `_proxy_` field in our package.json by the URL of your LemonLDAP instance.

Once the instance is running you can start the manager using `npm start`.

## Folders organisation

The source files of the manager are located in the `src/` folder. The files in this folder are separated by their use.

- The `app/` folder is for managing the redux store.
- The `component/` folder is for every components that can be used in a dashboard. They are also separated by page.
- The `dashboard/` folder is for the different templates for each dashboards.
- The `features/` folder is for managing the reducers for the redux store.
- The `pages/` folder is for the 4 different pages of LemonLDAP.
- The `static/` folder is for the rendered data that isn't from the configuration (langages, images, attributes, ...)
- The `utils/` folder is for useful functions needed in several files.

### Customisation

The css files are separated by components. Since we are using MUI some of the components need to be changed directly in the js file to be customized.

## Testing

The test files are in the `__test__` folder. To run tests, use the command `npm test`

# License

LemonLDAP::NG is a free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
