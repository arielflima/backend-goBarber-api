"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderDayAvaliabilityController {
  async index(req, res) {
    const {
      provider_id
    } = req.params;
    const {
      day,
      month,
      year
    } = req.body;

    const listProviderDayAvailabilityService = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day,
      month,
      year
    });
    return res.json(availability);
  }

}

exports.default = ProviderDayAvaliabilityController;