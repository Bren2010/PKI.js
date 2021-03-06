"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _Certificate = _interopRequireDefault(require("./Certificate.js"));

var _AttributeCertificateV = _interopRequireDefault(require("./AttributeCertificateV1.js"));

var _AttributeCertificateV2 = _interopRequireDefault(require("./AttributeCertificateV2.js"));

var _OtherCertificateFormat = _interopRequireDefault(require("./OtherCertificateFormat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class CertificateSet {
  //**********************************************************************************

  /**
   * Constructor for CertificateSet class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {Array}
     * @desc certificates
     */
    this.certificates = (0, _pvutils.getParametersValue)(parameters, "certificates", CertificateSet.defaultValues("certificates")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "certificates":
        return [];

      default:
        throw new Error(`Invalid member name for Attribute class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * CertificateSet ::= SET OF CertificateChoices
   *
   * CertificateChoices ::= CHOICE {
   *    certificate Certificate,
   *    extendedCertificate [0] IMPLICIT ExtendedCertificate,  -- Obsolete
   *    v1AttrCert [1] IMPLICIT AttributeCertificateV1,        -- Obsolete
   *    v2AttrCert [2] IMPLICIT AttributeCertificateV2,
   *    other [3] IMPLICIT OtherCertificateFormat }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Set({
      name: names.blockName || "",
      value: [new asn1js.Repeated({
        name: names.certificates || "certificates",
        value: new asn1js.Choice({
          value: [_Certificate.default.schema(), new asn1js.Constructed({
            idBlock: {
              tagClass: 3,
              // CONTEXT-SPECIFIC
              tagNumber: 0 // [0]

            },
            value: [new asn1js.Any()]
          }), // JUST A STUB
          new asn1js.Constructed({
            idBlock: {
              tagClass: 3,
              // CONTEXT-SPECIFIC
              tagNumber: 1 // [1]

            },
            value: _AttributeCertificateV.default.schema().valueBlock.value
          }), new asn1js.Constructed({
            idBlock: {
              tagClass: 3,
              // CONTEXT-SPECIFIC
              tagNumber: 2 // [2]

            },
            value: _AttributeCertificateV2.default.schema().valueBlock.value
          }), new asn1js.Constructed({
            idBlock: {
              tagClass: 3,
              // CONTEXT-SPECIFIC
              tagNumber: 3 // [3]

            },
            value: _OtherCertificateFormat.default.schema().valueBlock.value
          })]
        })
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["certificates"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, CertificateSet.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for CertificateSet"); //endregion
    //region Get internal properties from parsed schema

    this.certificates = Array.from(asn1.result.certificates || [], element => {
      const initialTagNumber = element.idBlock.tagNumber;
      if (element.idBlock.tagClass === 1) return new _Certificate.default({
        schema: element
      }); //region Making "Sequence" from "Constructed" value

      const elementSequence = new asn1js.Sequence({
        value: element.valueBlock.value
      }); //endregion

      switch (initialTagNumber) {
        case 1:
          return new _AttributeCertificateV.default({
            schema: elementSequence
          });

        case 2:
          return new _AttributeCertificateV2.default({
            schema: elementSequence
          });

        case 3:
          return new _OtherCertificateFormat.default({
            schema: elementSequence
          });

        case 0:
        default:
      }

      return element;
    }); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Set({
      value: Array.from(this.certificates, element => {
        switch (true) {
          case element instanceof _Certificate.default:
            return element.toSchema();

          case element instanceof _AttributeCertificateV.default:
            return new asn1js.Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: 1 // [1]

              },
              value: element.toSchema().valueBlock.value
            });

          case element instanceof _AttributeCertificateV2.default:
            return new asn1js.Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: 2 // [2]

              },
              value: element.toSchema().valueBlock.value
            });

          case element instanceof _OtherCertificateFormat.default:
            return new asn1js.Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: 3 // [3]

              },
              value: element.toSchema().valueBlock.value
            });

          default:
        }

        return element;
      })
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      certificates: Array.from(this.certificates, element => element.toJSON())
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = CertificateSet;
//# sourceMappingURL=CertificateSet.js.map