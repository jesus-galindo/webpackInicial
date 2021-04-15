
const HtmlWebPackPlugin = require('html-webpack-plugin');
//paquete para css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/** para minizar el css, el nombre puede ser cualquiera, 
 *  por ser una variable pero se recomienda que sea el nombre
 * del paquete
 * * */
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//para copiar los archivos
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
 
    mode: 'development',
    //mode: 'production',
    //minimiza css
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin()]
    },
    module:{
        rules: [
            //Sirven para decirle que hacer con los distintos tipos de archivo
            {
                //para incluir los archivos css
                test: /\.css$/,
                //excluye el archivo styles.css que queremos ponerlo aparte
                //y lo demas de css lo sigue importando
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
                
            },
            {
                //para incluir los archivos css, el styles es el nombre del archivo
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
                
            },
            {
                //Es la condición que debe cumplir, se usan expresiones regulares
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false, //quita comentarios y minifica el html
                },
            },
            /** para manejar las imagenes el \. es para escapar al punto */
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                       loader: 'file-loader',
                       options: {
                           esModule: false
                       } 
                    }
                ]

            }
        ],
    },
    //Aquí se ejecuta la instancia que hemos creado antes para que copie el index html de la carpeta src a dist para cuando se suba a producción
    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html', //archivo origen del html
            filename: './index.html' // donde se guardará
        }),
        new MiniCssExtractPlugin ({
            filename: '[name].css', //nombre del archivo que se va a crear
            ignoreOrder: false, //para quitar los warnings
        }),
        new CopyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets/' },
        ]
    }),

    ]
 
}
 