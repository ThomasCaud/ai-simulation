package main

import (
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"time"
)

type Grid struct {
	Width int
	Height int
	Cells[][] bool
}

func getCellImg(cell bool) string {
	if(cell) {
		return "▣"
	}
	return "□"
}

func display(grid Grid) {
	fmt.Println()
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
	if(rowMax >= grid.Height) {
		rowMax = grid.Height - 1
	}

	colMin := cellCol - 1
	if (colMin < 0) {
		colMin = 0
	}

	colMax := cellCol + 1
	if(colMax >= grid.Width) {
		colMax = grid.Width - 1
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

func getEmptyGrid(width int, height int) Grid {
	cells := make([][] bool, height)
	for i := range cells {
		cells[i] = make([]bool, width)
	}
	return Grid{width, height, cells}
}

func addLife(grid *Grid, density float64) {
	for i := 0 ; i < grid.Height - 1 ; i++ {
		for j := 0 ; j < grid.Width - 1 ; j++ {
			random := rand.Float64()
			if(random < density) {
				grid.Cells[i][j] = true
			}
		}
	}
}

func update(grid *Grid) {
	newGrid := getEmptyGrid(grid.Width, grid.Height)
	for i := 0 ; i < grid.Height - 1 ; i++ {
		for j := 0 ; j < grid.Width - 1 ; j++ {
			count := nbCellAround(*grid, i, j)
			if(count == 3 || (count == 2 && grid.Cells[i][j])) {
				newGrid.Cells[i][j] = true
			}
		}
	}
	grid.Cells = newGrid.Cells
}

func main() {
	width, err := strconv.Atoi(os.Args[1])
	if err != nil || width <= 0 {
		fmt.Println("Argument (1) should be a positive integer. Recommended: 100.")
		os.Exit(1)
	}

	height, err := strconv.Atoi(os.Args[2])
	if err != nil || height <= 0 {
		fmt.Println("Argument (2) should be a positive integer. Recommended: 60.")
		os.Exit(1)
	}

	density, err := strconv.ParseFloat(os.Args[3], 64)
	if err != nil || density <= 0 || density > 1 {
		fmt.Println("Argument (3) should be a float between 0 and 1. Recommended: 0.2.")
		os.Exit(1)
	}

	speed, err := strconv.Atoi(os.Args[4])
	if err != nil || speed < 0 {
		fmt.Println("Argument (4) should be a positive integer. Recommended: 100.")
		os.Exit(1)
	}

	grid := getEmptyGrid(width, height)
	addLife(&grid, density)

	for {
		display(grid)
		update(&grid)
		time.Sleep(time.Millisecond * time.Duration(speed))
	}
}