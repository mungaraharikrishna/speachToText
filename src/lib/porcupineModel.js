const porcupineModel = {
  publicPath: "assets/models/porcupine_params.pv",
  customWritePath: "2.2.0_porcupine_params.pv",
};

(function () {
  if (typeof module !== "undefined" && typeof module.exports !== "undefined")
    module.exports = porcupineModel;
})();