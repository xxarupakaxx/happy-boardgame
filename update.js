function update() {
    var numWhite = 0, numBlack = 0;
    for (var x = 0 ; x < 8 ; x++) {
        for (var y = 0 ; y < 8 ; y++) {
            if (data[x][y] == WHITE) {
                numWhite++;
            }
            if (data[x][y] == BLACK) {
                numBlack++;
            }
        }
    }
    document.getElementById("numBlack").textContent = numBlack;
    document.getElementById("numWhite").textContent = numWhite;

    var blackFlip = canFlip(BLACK);
    var whiteFlip = canFlip(WHITE);

    if (numWhite + numBlack == 64 || (!blackFlip && !whiteFlip)) {
        showMessage("ゲームオーバー")
    }
    else if (!blackFlip) {
        showMessage("黒スキップ");
        myTurn = false;
    }
    else if (!whiteFlip) {
        showMessage("白スキップ");
        myTurn = true;
    }
    else {
        myTurn = !myTurn;
    }
    if (!myTurn) {
        setTimeout(think, 1000);
    }
}

function showMessage(str) {
    document.getElementById("message").textContent = str;
    setTimeout(function () {
        document.getElementById("message").textContent = "";
    }, 2000);
}