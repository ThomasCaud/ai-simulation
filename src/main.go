package main

import (
	"fmt"
	"time"
	"math/rand"
)

type Grid struct {
	Width int
	Height int
	Cells[30][60] bool
}

func getCellImg(cell bool) string {
	if(cell) {
		return "▣"
	}
	return "□"
}

func display(grid Grid) {
    for i := range grid.Cells {
    	line := ""
    	for j := range grid.Cells[i] {
    		line += getCellImg(grid.Cells[i][j])
    	}
    	fmt.Println(line)
    }
}

func nbCellAround(grid Grid, cellRow int, cellCol int) int {
	count := 0
	rowMin := cellRow - 1
	if(rowMin < 0) {
		rowMin = 0
	}

	rowMax := cellRow + 1
	if(rowMax >= grid.Width) {
		rowMax = grid.Width - 1
	}

	colMin := cellCol - 1
	if (colMin < 0) {
		colMin = 0
	}

	colMax := cellCol + 1
	if(colMax >= grid.Height) {
		colMax = grid.Height - 1
	}

	for row := rowMin ; row <= rowMax ; row++ {
		for col := colMin ; col <= colMax ; col++ {
			if(grid.Cells[row][col] && !(row == cellRow && col == cellCol)) {
				count += 1
			}
		}
	}
	return count
}

func getEmptyGrid() Grid {
	cells := [30][60] bool{}
	return Grid{30, 60, cells}
}

func addLife(grid *Grid, density float64) {
	for i := 0 ; i < grid.Width - 1 ; i++ {
		for j := 0 ; j < grid.Height - 1 ; j++ {
			random := rand.Float64()
			if(random < density) {
				grid.Cells[i][j] = true
			}
		}
	}
}

func update(grid *Grid) {
	newGrid := getEmptyGrid()
	for i := 0 ; i < grid.Width - 1 ; i++ {
		for j := 0 ; j < grid.Height - 1 ; j++ {
			count := nbCellAround(*grid, i, j)
			if(count == 3 || (count == 2 && grid.Cells[i][j])) {
				newGrid.Cells[i][j] = true
			}
		}
	}
	grid.Cells = newGrid.Cells
}

func main() {
	grid := getEmptyGrid()
	addLife(&grid, 0.2)

	for {
		display(grid)
		fmt.Println()
		update(&grid)
		time.Sleep(time.Millisecond * 100)
	}
}