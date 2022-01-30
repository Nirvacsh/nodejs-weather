import express, { Request, Response, Application } from 'express'
import geocode from './utils/geocode'
import path from 'path'
import hbs from 'hbs'
import forecast from './utils/forecast'

const app: Application = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath: string = path.join(__dirname, '../public')
const viewsPath: string = path.join(__dirname, '../templates/views')
const partialsPath: string = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req: Request, res: Response): void => {
    res.render('index', {
        title: 'Weather',
        name: 'Vlad Zazhyrko',
    })
})

app.get('/about', (req: Request, res: Response): void => {
    res.render('about', {
        title: 'About Me',
        name: 'Vlad Zazhyrko',
    })
})

app.get('/help', (req: Request, res: Response): void => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vlad Zazhyrko',
    })
})

app.get('/weather', (req: Request, res: Response): void | Response => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address',
        })
    }

    geocode(
        req.query.address,
        (error: Error, { latitude, longitude, location } = {}): void | Response => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                })
            })
        }
    )
})

app.get('/help/*', (req: Request, res: Response): void => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.',
    })
})

app.get('*', (req: Request, res: Response): void => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.',
    })
})

app.listen(port, (): void => {
    console.log(`Server is up on port ${port}`)
})
