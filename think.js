  /**
         * コンピュータ思考関数
         */
        function think() {
            var highScore = -1000;
            var px = -1, py = -1;
            for (var x = 0 ; x < 8 ; x++) {
                for (var y = 0 ; y < 8 ; y++) {
                    var tmpData = copyData();
                    var flipped = getFlipCells(x, y, WHITE);
                    if (flipped.length > 0) {
                        for (var i = 0 ; i < flipped.length ; i++) {
                            var p = flipped[i][0];
                            var q = flipped[i][1];
                            tmpData[p][q] = WHITE;
                            tmpData[x][y] = WHITE;
                        }
                        var score = calcWeightData(tmpData);
                        if (score > highScore) {
                            highScore = score;
                            px = x, py = y;
                        }
                    }
                }
            }

            if (px >= 0 && py >= 0) {
                var flipped = getFlipCells(px, py, WHITE)
                if (flipped.length > 0) {
                    for (var k = 0 ; k < flipped.length ; k++) {
                        put(flipped[k][0], flipped[k][1], WHITE);
                    }
                }
                put(px, py, WHITE);
            } 

            update();
        }

        /**
         * 重みづけ計算
         */
        function calcWeightData(tmpData) {
            var score = 0;
            for (var x = 0 ; x < 8 ; x++) {
                for (var y = 0 ; y < 8 ; y++) {
                    if (tmpData[x][y] == WHITE) {
                        score += WeightData[x][y];
                    }
                }
            }
            return score;
        }

        /**
         * 駒テーブルデータをコピー
         */
        function copyData() {
            var tmpData = [];
            for (var x = 0 ; x < 8 ; x++) {
                tmpData[x] = [];
                for (var y = 0 ; y < 8 ; y++) {
                    tmpData[x][y] = data[x][y];
                }
            }
            return tmpData;
        }

        /**
         * 挟める駒があるか？
         */
        function canFlip(color) {
            for (var x = 0 ; x < 8 ; x++) {
                for (var y = 0 ; y < 8 ; y++) {
                    var flipped = getFlipCells(x, y, color);
                    if (flipped.length > 0) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * (i,j)に駒をおいたときに駒を挟めるか？
         */
        function getFlipCells(i, j, color) {
            if (data[i][j] == BLACK || data[i][j] == WHITE) {   // 既に駒がある
                return [];
            }

            // 相手を挟めるか、左上、上、右上、左、右、左下、下、右下と順番に調査
            var dirs = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
            var result = [];
            for (var p = 0 ; p < dirs.length ; p++) {
                var flipped = getFlipCellsOneDir(i, j,
                    dirs[p][0], dirs[p][1], color);
                result = result.concat(flipped)
            }
            return result;
        }

        /**
         * (i,j)に駒をおいたときに、(dx,dy)方向で駒を挟めるか？
         */
        function getFlipCellsOneDir(i, j, dx, dy, color) {
            var x = i + dx;
            var y = j + dy;
            var fliped = [];

            if (x < 0 || y < 0 || x > 7 || y > 7 ||
                data[x][y] == color || data[x][y] == 0) {
                // 盤外、同色、空ならfalse
                return [];
            }
            fliped.push([x, y]);

            while (true) {
                x += dx;
                y += dy;
                if (x < 0 || y < 0 || x > 7 || y > 7 || data[x][y] == 0) {
                    // 盤外、空ならfalse
                    return [];
                }
                if (data[x][y] == color) { // 挟めた！
                    return fliped;
                } else {
                    fliped.push([x, y]);
                }
            }
        }