export default () => (`
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/index.css">
    <link rel="stylesheet" href="./css/sidenav.css">
    <link rel="stylesheet" href="./css/timer.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>jungtong pj</title>
    <style type="text/css">
        html, body{
            margin: 0px;
            height: 0px;
        }
        html, body, #screen{
            width: 100%;
            height: 100%;
        }
        .material-icons.md-18 { font-size: 18px; }
        .material-icons.md-24 { font-size: 24px; }
        .material-icons.md-36 { font-size: 36px; }
        .material-icons.md-48 { font-size: 48px; }
    </style>
</head>
<body>
    <div id="screen">

        <div id="mysidenav" class="mysidenav">
            <a href="#" class="closebtn" onclick='closeNav()'>X</a>
            <a href="">유저</a>
            <a href="">팀</a>
            <a href="">통계</a>
            <a href="">단어 추가하기</a>
        </div>

        <h1> Tango에 오신 것을 환영합니다! </h1>

        <nav>
            <span class="logo">Tango</span>
            <div class = "icon">
                <button class="material-icons md-36">
                    access_alarm
                </button>
                <span class="material-icons md-36" onclick="openNav()">
                    person
                </span>
            </div>
        </nav> 
        

        <footer>
            <p>뭔가 아래에 들어가야 할 것 같은 글</p>
        </footer>
    </div>

    <script type="module" src="./js/index.js"></script>
    <script src="./js/sidenav.js"></script>
    <script src="./js/timer.js"></script>
</body>
</html>
`)