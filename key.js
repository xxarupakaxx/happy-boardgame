   /**
         * 盤上のセルクリック時のコールバック関数
         */
        function clicked(e) {
            if (!myTurn) {   // PC考え中
                return;
            }
            var id = e.target.id;
            var i = parseInt(id.charAt(4));
            var j = parseInt(id.charAt(5));

            var flipped = getFlipCells(i, j, BLACK)
            if (flipped.length > 0) {
                for (var k = 0 ; k < flipped.length ; k++) {
                    put(flipped[k][0], flipped[k][1], BLACK);
                }
                put(i, j, BLACK);
                update();
            }
        }

        /**
         * (i,j)にcolor色の駒を置く
         */
        function put(i, j, color) {
            var c = document.getElementById("cell" + i + j);
            c.textContent = "●";
            c.className = "cell " + (color == BLACK ? "black" : "white");
            data[i][j] = color;
        }