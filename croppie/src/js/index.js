import "croppie/croppie.css";
import "../less/style.less";

import Croppie from "croppie";
import Vue from "vue/dist/vue.esm";
import rem from "./rem";

import bgImgUrl from "../assets/bg.png";

const vm = new Vue({
    el: "#app",
    data() {
        return {
            currentPage: 1,
            userText: null,
            userImageSrc: null,
            userGenerateSrc: null,
            uploadCrop: null,
            isGenerateComplete: false,
        };
    },
    methods: {
        uploadImage(event) {
            const that = this;
            //创建Croppie对象
            if (that.uploadCrop == null) {
                that.uploadCrop = new Croppie(
                    document.getElementById("croppie"),
                    {
                        viewport: {
                            width: 518 / 2,
                            height: 602 / 2,
                            type: "square",
                        },
                        showZoomer: false,
                        enableOrientation: true,
                        enforceBoundary: true,
                    }
                );
            }
            this.readFile(event.target); //读取上传图片，绑定到Croppie
            that.currentPage = 2;
        },
        readFile(input) {
            const that = this;
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    that.uploadCrop.bind({
                        url: e.target.result,
                        orientation: 1,
                    });
                };
                reader.readAsDataURL(input.files[0]);
            } else {
                that.currentPage = 1;
            }
        },
        cropCancel() {
            this.currentPage = 1;
        },
        cropRotate() {
            this.uploadCrop.rotate(90);
        },
        cropComplete() {
            const that = this;
            this.uploadCrop
                .result({
                    type: "canvas",
                    size: {
                        with: 828,
                    },
                })
                .then((resp) => {
                    that.userImageSrc = resp;
                    that.currentPage = 1;
                })
                .catch((error) => {
                    alert("上传错误：" + error);
                    that.currentPage = 1;
                });
        },
        generate() {
            const that = this;
            if (that.userText == null) {
                alert("请输入文字");
                return;
            }

            if (that.userImageSrc == null) {
                alert(请上传图片);
                return;
            }

            that.drawCanvas([that.userImageSrc, bgImgUrl]);
            this.currentPage = 3;
        },
        drawCanvas(data) {
            const that = this;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 828;
            canvas.height = 1792;
            const len = data.length;
            const drawing = (n) => {
                if (n < len) {
                    let img = new Image();
                    img.crossOrigin = "Anonymous";
                    img.src = data[n];
                    img.onload = () => {
                        if (n == 0) {
                            ctx.drawImage(img, 0, 350, 828, 966);
                        } else if (n == 1) {
                            ctx.drawImage(img, 0, 0, 828, 1792);
                        }
                        drawing(n + 1);
                    };
                } else {
                    ctx.textAlign = "center";
                    ctx.textBaseline = "bottom";
                    ctx.font = "64px 微软雅黑";
                    ctx.fillStyle = "#FDBC08";
                    ctx.fillText(that.userText, 414, 1486);
                    that.userGenerateSrc = canvas.toDataURL("image/jpeg", 0.92);
                }
            };

            drawing(0);
        },
    },
});
