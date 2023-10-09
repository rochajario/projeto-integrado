export class VerificationUtility {
  buildVerifications(antropometry) {
    let verifications = [];
    verifications.push(this.getGeneralInfoData(antropometry));
    verifications.push(this.getCircumferencesData(antropometry));
    verifications.push(this.getSkinFoldData(antropometry));

    return verifications.filter((item) => item.label);
  }

  obtainVerificationItem(title, icon, stepsData) {
    return {
      label: title,
      icon: icon,
      disabled: stepsData.length == 0,
      children: stepsData,
    };
  }

  getGeneralInfoData(antropometry) {
    let data = [];
    if (!antropometry || !antropometry.generalInformation) {
      return data;
    }

    const generalInformation = antropometry.generalInformation;
    data = [
      {
        label: generalInformation
          ? `Idade: ${generalInformation.age}`
          : "Não Informado",
      },
      {
        label: generalInformation
          ? `Altura: ${generalInformation.height}`
          : "Não Informado",
      },
      {
        label: generalInformation
          ? `Fator de Atividade: ${generalInformation.activityFactor.value}`
          : "Não Informado",
      },
    ];
    return this.obtainVerificationItem("Informações Gerais", "mdi-scale", data);
  }

  getCircumferencesData(antropometry) {
    let data = [];
    if (!antropometry || !antropometry.circumferences) {
      return data;
    }

    const circumferences = antropometry.circumferences;

    data = [
      {
        label: `Braço: ${
          circumferences.arm ? circumferences.arm : "Não Informado"
        }`,
      },
      {
        label: `Pulso: ${
          circumferences.wrist ? circumferences.wrist : "Não Informado"
        }`,
      },
      {
        label: `Cintura: ${
          circumferences.waist ? circumferences.waist : "Não Informado"
        }`,
      },
      {
        label: `Abdome: ${
          circumferences.abdomen ? circumferences.abdomen : "Não Informado"
        }`,
      },
      {
        label: `Quadril: ${
          circumferences.hip ? circumferences.hip : "Não Informado"
        }`,
      },
      {
        label: `Panturrilha: ${
          circumferences.calf ? circumferences.calf : "Não Informado"
        }`,
      },
    ];
    return this.obtainVerificationItem(
      "Circunferências",
      "mdi-android-studio",
      data
    );
  }

  getSkinFoldData(antropometry) {
    let data = [];
    if (!antropometry || !antropometry.skinFold) {
      return data;
    }

    const skinFold = antropometry.skinFold;
    data = [
      {
        label: `Braço: ${skinFold.chest ? skinFold.chest : "Não Informado"}`,
      },
      {
        label: `Axilar Média: ${
          skinFold.middleAxillary ? skinFold.middleAxillary : "Não Informado"
        }`,
      },
      {
        label: `Subescapular: ${
          skinFold.subscapular ? skinFold.subscapular : "Não Informado"
        }`,
      },
      {
        label: `Trícepital: ${
          skinFold.triceps ? skinFold.triceps : "Não Informado"
        }`,
      },
      {
        label: `Abdominal: ${
          skinFold.abdominal ? skinFold.abdominal : "Não Informado"
        }`,
      },
      {
        label: `Suprailíaco: ${
          skinFold.suprailiac ? skinFold.suprailiac : "Não Informado"
        }`,
      },
      {
        label: `Coxa: ${skinFold.thigh ? skinFold.thigh : "Não Informado"}`,
      },
    ];
    return this.obtainVerificationItem("Dobras Cutâneas", "mdi-human", data);
  }
}
