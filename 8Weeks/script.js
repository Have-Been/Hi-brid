    const myCanvas = document.getElementById('myCanvas');
    const ctx = myCanvas.getContext('2d');

    function input(event, color) {
      var mouse_x = event.clientX - ctx.canvas.offsetLeft;
      var mouse_y = event.clientY - ctx.canvas.offsetTop;

      if (mouse_x >= 100 && mouse_y >= 100 && mouse_x <= 200 && mouse_y <= 200) {

        console.log("x : " + mouse_x);
        console.log("y : " + mouse_y);

        ctx.fillRect(100, 100, 100, 100);

      }
    }

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 300, 300);

    ctx.fillStyle = "gold";
    ctx.fillRect(100, 100, 100, 100);

    ctx.font = "normal bold 30px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "Black";
    ctx.fillText("click!", 150, 160);

    myCanvas.addEventListener('mousedown', () => {
        input(event, "Black");
    });

    //myCanvas.addEventListener('mouseover', () => {
    //     input(event, "pink");
    // });

    // myCanvas.addEventListener('mouseout', () => {
        
    //     input(event, "gold");
    // });