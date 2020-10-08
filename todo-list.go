package main

import (
	"fmt"
	"github.com/sciter-sdk/go-sciter"
	_ "github.com/sciter-sdk/go-sciter"
	"github.com/sciter-sdk/go-sciter/window"
	"log"
	"path/filepath"
)
func main()  {

	rect := sciter.NewRect(100, 300, 430, 502)
	w, err := window.New(sciter.DefaultWindowCreateFlag, rect)
	//w.SetResourceArchive(resource_name)
	if err != nil {
		log.Fatal(err)
	}
	fullpath, err := filepath.Abs("index.html")
	fmt.Println(fullpath)
	if err != nil {
		log.Fatal(err)
	}
	_ = w.LoadFile(fullpath);
	w.SetTitle("代码片段");
	w.Show()
	w.Run()

}
