/*global  $*/
/*jslint browser:true */
$(function () {
    "use strict";

    var work = document.getElementById("work"),
        drawing = false,
        textAppir = false,
        context = work.getContext('2d'),
        canvas = $("#work"),
        colorPicker = $("#cp"),
        pencilBtn = $("#crayon"),
        lineBtn = $("#line"),
        rectBtn = $("#rect"),
        rectPleinBtn = $("#rectPlein"),
        circleBtn = $("#circle"),
        circlePleinBtn = $("#circlePlein"),
        gommeBtn = $("#gomme"),
        range = $("#range"),
        clearBtn = $("#clear"),
        input = $("#txt"),
        font = $("#font"),
        size = $("#size"),
        appearTextBtn = $("#appearText"),
        downloadBtn = $("#dll"),
        img = $("#img"),
        image = new Image(),
        validateImg = $("#validateImg"),
        lastX = 0,
        lastY = 0,
        x1 = 0,
        x2 = 0,
        y1 = 0,
        y2 = 0,


        /*--- Clear ---*/

        clearFn = function clear() {
            canvas.unbind();
            textAppir = false;
            context.clearRect(0, 0, canvas.width(), canvas.height());
        },

        /*--- Texte ---*/

        letsAppearTextFn = function letsAppearText() {
            textAppir = true;

            canvas.unbind();

            if (textAppir) {

                canvas.on({

                    mousedown: function (e) {

                        context.font = size.val() + "px" + " " + font.val();
                        context.fillText(input.val(), e.offsetX, e.offsetY);

                        context.fillStyle = colorPicker.val();

                    }
                });
            }
        },

        /*--- Download ---*/

        dlCanvasFn =  function dlCanvas() {
            var dataURL = canvas.toDataURL('image/png');
            $(this).href = dataURL;
        },


        /*--- InsertImg ---*/

        insertImgFn = function insertImg() {
            canvas.unbind();
            image.src = img.val();
            context.drawImage(image, 35, 35);
        },


        /*--- Crayon ---*/

        pencilFn = function pencil() {

            canvas.unbind();

            canvas.on({

                mousedown: function (e) {
                    drawing = true;
                    context.beginPath();
                    context.moveTo(e.offsetX, e.offsetY);
                    context.stroke();
                },

                mousemove: function (e) {
                    if (drawing) {
                        context.strokeStyle = colorPicker.val();
                        context.lineWidth = range.val();
                        context.lineTo(e.offsetX + 1, e.offsetY + 1);
                        context.stroke();
                    }
                },

                mouseup: function () {
                    drawing = false;
                    context.closePath();
                }

            });
        },

        /*--- Ligne ---*/

        lineFn = function drawLine() {

            canvas.unbind();

            canvas.on({

                mousedown: function (e) {

                    lastX = e.offsetX;
                    lastY = e.offsetY;

                    context.beginPath();
                    context.strokeStyle = colorPicker.val();
                    context.lineWidth = range.val();
                    context.moveTo(lastX, lastY);

                },


                mouseup: function (e) {

                    lastX = e.offsetX;
                    lastY = e.offsetY;

                    context.lineTo(lastX, lastY);
                    context.stroke();
                    context.closePath();
                }
            });
        },

        /*--- Rectangle ---*/

        rectFn = function drawRect() {

            canvas.unbind();

            canvas.on({

                mousedown: function (e) {

                    x1 = e.offsetX;
                    y1 = e.offsetY;

                    context.beginPath();
                    context.strokeStyle = colorPicker.val();
                },


                mouseup: function (e) {

                    x2 = e.offsetX - x1;
                    y2 = e.offsetY - y1;

                    context.strokeRect(x1, y1, x2, y2);
                    context.closePath();
                }
            });
        },

        /*--- Rectangle Plein ---*/

        rectPlainFn = function drawRectPlain() {

            canvas.unbind();

            canvas.on({

                mousedown: function (e) {

                    x1 = e.offsetX;
                    y1 = e.offsetY;

                    context.beginPath();
                    context.fillStyle = colorPicker.val();
                    context.lineWidth = range.val();
                },


                mouseup: function (e) {

                    x2 = e.offsetX - x1;
                    y2 = e.offsetY - y1;

                    context.fillRect(x1, y1, x2, y2);
                    context.closePath();
                }
            });
        },

        /*--- Cercle ---*/

        circleFn = function drawCircle() {

            canvas.unbind();

            canvas.on({

                mousedown: function (e) {

                    x1 = e.offsetX;
                    y1 = e.offsetY;

                    context.beginPath();
                    context.strokeStyle = colorPicker.val();
                },


                mouseup: function (e) {

                    x2 = e.offsetX - x1;

                    context.arc(x1, y1, x2, 0, Math.PI + (Math.PI * 2) / 2);
                    context.stroke();
                    context.closePath();
                }
            });
        },

        /*--- Cercle ---*/

        circlePlainFn = function drawCirclePlain() {

            canvas.unbind();

            canvas.on({

                mousedown: function (e) {

                    x1 = e.offsetX;
                    y1 = e.offsetY;

                    context.beginPath();
                    context.fillStyle = colorPicker.val();
                    context.lineWidth = range.val();
                },


                mouseup: function (e) {

                    x2 = e.offsetX - x1;

                    context.arc(x1, y1, x2, 0, Math.PI + (Math.PI * 2) / 2);
                    context.fill();
                    context.closePath();
                }
            });
        },

        /*--- Gomme ---*/

        gommeFn = function gomme() {

            canvas.unbind();

            canvas.on({

                mousedown: function (e) {
                    drawing = true;
                    context.beginPath();
                    context.moveTo(e.offsetX, e.offsetY);
                    context.stroke();
                },

                mousemove: function (e) {
                    if (drawing) {
                        context.strokeStyle = "#FFF";
                        context.lineWidth = range.val();
                        context.lineTo(e.offsetX + 1, e.offsetY + 1);
                        context.stroke();
                    }
                },

                mouseup: function () {
                    drawing = false;
                    context.closePath();
                }

            });
        };


    pencilBtn.click(pencilFn);
    lineBtn.click(lineFn);
    rectBtn.click(rectFn);
    rectPleinBtn.click(rectPlainFn);
    circleBtn.click(circleFn);
    circlePleinBtn.click(circlePlainFn);
    gommeBtn.click(gommeFn);
    clearBtn.click(clearFn);
    appearTextBtn.click(letsAppearTextFn);
    downloadBtn.click(dlCanvasFn);
    validateImg.click(insertImgFn);

});