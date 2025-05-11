module.exports = {
    plugins: [
        require("postcss-modules")({
            generateScopedName: "[name]__[local]___[hash:base64:5]",
        }),
        require("autoprefixer"),
        require("cssnano")({ preset: "default" }),
    ],
};
