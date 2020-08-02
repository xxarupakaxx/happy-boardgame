  
         /* 初期化関数
         */
        function init() {
            var b = document.getElementById("board");
            for (var i = 0 ; i < 8 ; i++) {
                var tr = document.createElement("tr");
                data[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                for (var j = 0 ; j < 8 ; j++) {
                    var td = document.createElement("td");
                    td.className = "cell";
                    td.id = "cell" + i + j;
                    td.onclick = clicked;
                    tr.appendChild(td);
                }
                b.appendChild(tr);
            }
            put(3, 3, BLACK);
            put(4, 4, BLACK);
            put(3, 4, WHITE);
            put(4, 3, WHITE);
            update();
        }

     