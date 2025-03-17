const photos = [];

for await (const dirEntry of Deno.readDir("./photos")) {
    photos.push(dirEntry.name)
}

const css = photos
    .filter(f => f != '.DS_Store')
    .map(f => `\t.img.${f.replace('.jpg','')} { background-image: url("./photos/${f}"); }`)
    .join("\n")

const html = photos
    .filter(f => f != '.DS_Store')
    .sort()
    .reverse()
    .map((f,i) => `\t<div class="img ${f.replace('.jpg','')} ${ i == 0 ? 'first' : ''}"></div>`)
    .join("\n")

var template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OLIVL</title>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-4B2F7QXC3N"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-4B2F7QXC3N');
    </script>
    <style>
        body {
            margin: 0;
            display: flex;
            flex-direction: column; 
            align-items: center;
        }

        .content {
            width: 90%;
            display: flex;
            flex-direction: column; 
            align-items: center;
            padding-bottom: 20px;
        }

        header {
            background-color: #333;
            width: 90px;
            color: #fff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            text-transform: uppercase;
        }

        .img {
            width: 100%;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            height: calc(100vh - 105px); 
            margin: 30px 0;
        }
        
        .img.first {margin: 20px 0;}

${css}
    </style>
</head>
<body>
    <div class="content">
        <header>OLIVL</header>

${html}
    </div>
</body>
</html>
`;


await Deno.writeTextFile("index.html", template, { append: false });