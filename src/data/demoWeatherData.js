// Real-Time Atmospheric Telemetry & Nowcasting Engine Data for SIH26077

export const SCENARIOS = {
  NORMAL: 'NORMAL',
  MODERATE_RAIN: 'MODERATE_RAIN',
  HEAVY_RAIN: 'HEAVY_RAIN',
  SEVERE_WEATHER: 'SEVERE_WEATHER'
};

export const SCENARIO_METADATA = {
  NORMAL: {
    id: 'NORMAL',
    name: 'Normal Weather',
    badge: '🟢 SAFE / STABLE',
    icon: 'Sun',
    color: 'emerald',
    riskLevel: 'SAFE',
    overallScore: 22,
    alertTitle: 'No Active Severe Weather Warnings',
    alertMessage: 'Atmospheric telemetry is normal across all 5 monitored sectors.',
    accentBg: 'bg-emerald-50/80',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-800'
  },
  MODERATE_RAIN: {
    id: 'MODERATE_RAIN',
    name: 'Moderate Rain',
    badge: '🟡 LOW - MODERATE RISK',
    icon: 'CloudRain',
    color: 'amber',
    riskLevel: 'MODERATE',
    overallScore: 52,
    alertTitle: 'Moderate Precipitation Advisory',
    alertMessage: 'Isolated shower cells moving west-southwest towards Waluj & CIDCO.',
    accentBg: 'bg-amber-50/80',
    accentBorder: 'border-amber-200',
    accentText: 'text-amber-800'
  },
  HEAVY_RAIN: {
    id: 'HEAVY_RAIN',
    name: 'Heavy Rain',
    badge: '🟠 HIGH RISK ALERT',
    icon: 'CloudLightning',
    color: 'orange',
    riskLevel: 'HIGH',
    overallScore: 86,
    alertTitle: '🚨 SEVERE RAINFALL WARNING',
    alertMessage: 'Rapid convective escalation detected near Waluj low-lying industrial zone.',
    accentBg: 'bg-rose-50/90',
    accentBorder: 'border-rose-300',
    accentText: 'text-rose-800'
  },
  SEVERE_WEATHER: {
    id: 'SEVERE_WEATHER',
    name: 'Severe Cloudburst Risk',
    badge: '🟣 EXTREME RISK EMERGENCY',
    icon: 'Zap',
    color: 'purple',
    riskLevel: 'EXTREME',
    overallScore: 96,
    alertTitle: '⚡ CLOUDBURST & FLASH FLOOD EMERGENCY',
    alertMessage: 'Extreme precipitation rates exceeding 95mm/hr with storm surge risk in Waluj & Paithan basins.',
    accentBg: 'bg-purple-50/90',
    accentBorder: 'border-purple-300',
    accentText: 'text-purple-900'
  }
};

// Weather data for each location under different scenarios
export const WEATHER_DATA_BY_SCENARIO = {
  NORMAL: {
    waluj: {
      temp: 31.2,
      humidity: 48,
      rainfall: 0.2,
      windSpeed: 12,
      windDirection: 'SW',
      pressure: 1012,
      riskLevel: 'SAFE',
      riskScore: 18,
      predictedRisk: 'SAFE',
      predictionConfidence: '92% (SIMULATION)',
      expectedTime: 'Stable (Next 6 hrs)',
      recommendedAction: {
        en: 'Normal conditions. No weather hazards detected.',
        mr: 'सामान्य परिस्थिती. हवामानाचा कोणताही धोका आढळलेला नाही.',
        hi: 'सामान्य स्थिति। मौसम का कोई खतरा नहीं पाया गया।'
      }
    },
    cidco: {
      temp: 30.8,
      humidity: 51,
      rainfall: 0.0,
      windSpeed: 10,
      windDirection: 'SSW',
      pressure: 1013,
      riskLevel: 'SAFE',
      riskScore: 15,
      predictedRisk: 'SAFE',
      predictionConfidence: '95% (SIMULATION)',
      expectedTime: 'Stable (Next 6 hrs)',
      recommendedAction: {
        en: 'Clear sky. Safe for normal activity.',
        mr: 'निरभ्र आकाश. सामान्य हालचालींसाठी सुरक्षित.',
        hi: 'साफ आसमान। सामान्य गतिविधियों के लिए सुरक्षित।'
      }
    },
    city_center: {
      temp: 31.5,
      humidity: 49,
      rainfall: 0.0,
      windSpeed: 11,
      windDirection: 'SW',
      pressure: 1012,
      riskLevel: 'SAFE',
      riskScore: 14,
      predictedRisk: 'SAFE',
      predictionConfidence: '94% (SIMULATION)',
      expectedTime: 'Stable',
      recommendedAction: {
        en: 'Normal city operations.',
        mr: 'नियमित शहर कामकाज.',
        hi: 'सामान्य शहर गतिविधियां।'
      }
    },
    paithan: {
      temp: 32.0,
      humidity: 45,
      rainfall: 0.0,
      windSpeed: 14,
      windDirection: 'S',
      pressure: 1011,
      riskLevel: 'SAFE',
      riskScore: 12,
      predictedRisk: 'SAFE',
      predictionConfidence: '96% (SIMULATION)',
      expectedTime: 'Stable',
      recommendedAction: {
        en: 'Dam levels normal. Safe riverbank conditions.',
        mr: 'धरण पातळी सामान्य. नदीकाठ सुरक्षित.',
        hi: 'बांध का स्तर सामान्य। तट सुरक्षित।'
      }
    },
    vaijapur: {
      temp: 32.4,
      humidity: 44,
      rainfall: 0.0,
      windSpeed: 15,
      windDirection: 'W',
      pressure: 1010,
      riskLevel: 'SAFE',
      riskScore: 20,
      predictedRisk: 'LOW',
      predictionConfidence: '91% (SIMULATION)',
      expectedTime: 'Stable',
      recommendedAction: {
        en: 'Light cloudiness in late afternoon.',
        mr: 'दुपारनंतर हलके ढग.',
        hi: 'दोपहर बाद हल्के बादल।'
      }
    },
    kannad: {
      temp: 28.5,
      humidity: 58,
      rainfall: 1.2,
      windSpeed: 18,
      windDirection: 'WSW',
      pressure: 1008,
      riskLevel: 'LOW',
      riskScore: 24,
      predictedRisk: 'LOW',
      predictionConfidence: '89% (SIMULATION)',
      expectedTime: 'Next 2 hrs',
      recommendedAction: {
        en: 'Ghat pass mist present. Drive carefully.',
        mr: 'घाटात धुके. काळजीपूर्वक वाहन चालवा.',
        hi: 'घाट में कोहरा। सावधानी से गाड़ी चलाएं।'
      }
    },
    shendra: {
      temp: 30.5,
      humidity: 50,
      rainfall: 0.0,
      windSpeed: 11,
      windDirection: 'SW',
      pressure: 1012,
      riskLevel: 'SAFE',
      riskScore: 16,
      predictedRisk: 'SAFE',
      predictionConfidence: '93% (SIMULATION)',
      expectedTime: 'Stable',
      recommendedAction: {
        en: 'Smart industrial grid running normally.',
        mr: 'स्मार्ट औद्योगिक ग्रिड सामान्यपणे सुरू आहे.',
        hi: 'स्मार्ट इंडस्ट्रियल ग्रिड सामान्य रूप से चल रहा है।'
      }
    }
  },
  MODERATE_RAIN: {
    waluj: {
      temp: 27.5,
      humidity: 74,
      rainfall: 18.5,
      windSpeed: 24,
      windDirection: 'WSW',
      pressure: 1006,
      riskLevel: 'MODERATE',
      riskScore: 52,
      predictedRisk: 'MODERATE',
      predictionConfidence: '87% (SIMULATION)',
      expectedTime: 'Next 45 minutes',
      recommendedAction: {
        en: 'Expect water accumulation in low-lying underpasses. Slow down traffic.',
        mr: 'सखल पुलांखाली पाणी साचण्याची शक्यता. वाहन वेग कमी करा.',
        hi: 'निचले पुलों के नीचे पानी भरने की संभावना। वाहनों की गति धीमी रखें।'
      }
    },
    cidco: {
      temp: 27.2,
      humidity: 76,
      rainfall: 14.0,
      windSpeed: 21,
      windDirection: 'SW',
      pressure: 1007,
      riskLevel: 'LOW',
      riskScore: 38,
      predictedRisk: 'MODERATE',
      predictionConfidence: '85% (SIMULATION)',
      expectedTime: 'Next 60 minutes',
      recommendedAction: {
        en: 'Moderate showers. Carry umbrellas and drive with headlights.',
        mr: 'मध्यम पाऊस. छत्र्या सोबत ठेवा आणि हेडलाइट्ससह वाहन चालवा.',
        hi: 'मध्यम बारिश। छाता साथ रखें और हेडलाइट्स जलाकर गाड़ी चलाएं।'
      }
    },
    city_center: {
      temp: 28.0,
      humidity: 71,
      rainfall: 9.5,
      windSpeed: 19,
      windDirection: 'SW',
      pressure: 1007,
      riskLevel: 'LOW',
      riskScore: 32,
      predictedRisk: 'LOW',
      predictionConfidence: '88% (SIMULATION)',
      expectedTime: 'Next 60 minutes',
      recommendedAction: {
        en: 'Light to moderate rain spell expected.',
        mr: 'हलका ते मध्यम पाऊस पडण्याची शक्यता.',
        hi: 'हल्की से मध्यम बारिश की संभावना।'
      }
    },
    paithan: {
      temp: 28.8,
      humidity: 68,
      rainfall: 6.0,
      windSpeed: 22,
      windDirection: 'SSW',
      pressure: 1008,
      riskLevel: 'SAFE',
      riskScore: 26,
      predictedRisk: 'LOW',
      predictionConfidence: '90% (SIMULATION)',
      expectedTime: 'Next 90 minutes',
      recommendedAction: {
        en: 'River monitoring nodes active. No immediate flood risk.',
        mr: 'नदी देखरेख नोड्स सक्रिय. कोणताही तातडीचा ​​पूर धोका नाही.',
        hi: 'नदी निगरानी नोड्स सक्रिय। बाढ़ का तत्काल कोई खतरा नहीं।'
      }
    },
    vaijapur: {
      temp: 26.8,
      humidity: 80,
      rainfall: 22.0,
      windSpeed: 28,
      windDirection: 'W',
      pressure: 1005,
      riskLevel: 'MODERATE',
      riskScore: 48,
      predictedRisk: 'MODERATE',
      predictionConfidence: '86% (SIMULATION)',
      expectedTime: 'Next 30 minutes',
      recommendedAction: {
        en: 'Agricultural field drainage check advised.',
        mr: 'शेतातील पाण्याचा निचरा तपासावा.',
        hi: 'खेतों में पानी के निकास की जांच करने की सलाह दी जाती है।'
      }
    },
    kannad: {
      temp: 25.0,
      humidity: 85,
      rainfall: 31.0,
      windSpeed: 32,
      windDirection: 'WNW',
      pressure: 1003,
      riskLevel: 'MODERATE',
      riskScore: 56,
      predictedRisk: 'HIGH',
      predictionConfidence: '83% (SIMULATION)',
      expectedTime: 'Next 30 minutes',
      recommendedAction: {
        en: 'Caution advised on Kannad Ghat turns due to low visibility.',
        mr: 'कमी दृश्यमानतेमुळे कन्नड घाटातील वळणावर काळजी घ्या.',
        hi: 'कम दृश्यता के कारण कन्नड़ घाट के मोड़ पर सावधानी बरतें।'
      }
    },
    shendra: {
      temp: 27.8,
      humidity: 72,
      rainfall: 11.2,
      windSpeed: 20,
      windDirection: 'SW',
      pressure: 1007,
      riskLevel: 'LOW',
      riskScore: 34,
      predictedRisk: 'LOW',
      predictionConfidence: '89% (SIMULATION)',
      expectedTime: 'Next 60 minutes',
      recommendedAction: {
        en: 'Rainwater harvesting telemetry operating normally.',
        mr: 'रेनवॉटर हार्वेस्टिंग टेलिमेट्री सुरळीत सुरू आहे.',
        hi: 'वर्षा जल संचयन टेलीमेट्री सामान्य रूप से चल रही है।'
      }
    }
  },
  HEAVY_RAIN: {
    waluj: {
      temp: 25.1,
      humidity: 89,
      rainfall: 52.0,
      windSpeed: 38,
      windDirection: 'WSW',
      pressure: 1001,
      riskLevel: 'HIGH',
      riskScore: 86,
      predictedRisk: 'HIGH',
      predictionConfidence: '84% (SIMULATION)',
      expectedTime: 'Next 30 minutes',
      recommendedAction: {
        en: 'Avoid low-lying roads, MIDC drainage corridors, and unnecessary travel.',
        mr: 'सखल रस्ते, MIDC ड्रेनेज कॉरिडॉर आणि अनावश्यक प्रवास टाळा.',
        hi: 'निचली सड़कों, MIDC जल निकासी गलियारों और अनावश्यक यात्रा से बचें।'
      }
    },
    cidco: {
      temp: 25.5,
      humidity: 87,
      rainfall: 44.5,
      windSpeed: 34,
      windDirection: 'SW',
      pressure: 1002,
      riskLevel: 'HIGH',
      riskScore: 78,
      predictedRisk: 'HIGH',
      predictionConfidence: '86% (SIMULATION)',
      expectedTime: 'Next 45 minutes',
      recommendedAction: {
        en: 'Waterlogging expected around Jalna road underpasses. Seek high ground.',
        mr: 'जालना रस्ता पुलांखाली पाणी साचण्याची शक्यता. उंच जागा शोधा.',
        hi: 'जालना रोड पुलों के पास जलभराव की आशंका। ऊंचे स्थानों पर जाएं।'
      }
    },
    city_center: {
      temp: 26.0,
      humidity: 84,
      rainfall: 38.0,
      windSpeed: 30,
      windDirection: 'WSW',
      pressure: 1003,
      riskLevel: 'MODERATE',
      riskScore: 68,
      predictedRisk: 'HIGH',
      predictionConfidence: '85% (SIMULATION)',
      expectedTime: 'Next 45 minutes',
      recommendedAction: {
        en: 'Urban runoff warning. Avoid parking near storm channels.',
        mr: 'शहरी पाण्याचा निचरा इशारा. वादळी नाल्यांजवळ पार्किंग टाळा.',
        hi: 'शहरी जलजमाव की चेतावनी। नालों के पास वाहन पार्क करने से बचें।'
      }
    },
    paithan: {
      temp: 26.2,
      humidity: 82,
      rainfall: 29.0,
      windSpeed: 33,
      windDirection: 'S',
      pressure: 1004,
      riskLevel: 'MODERATE',
      riskScore: 61,
      predictedRisk: 'MODERATE',
      predictionConfidence: '87% (SIMULATION)',
      expectedTime: 'Next 60 minutes',
      recommendedAction: {
        en: 'Alert issued to downstream Godavari riverbank settlements.',
        mr: 'गोदावरी नदीकाठच्या सखल भागातील वस्त्यांना इशारा जारी.',
        hi: 'गोदावरी नदी के निचले तटीय क्षेत्रों को अलर्ट जारी।'
      }
    },
    vaijapur: {
      temp: 24.8,
      humidity: 91,
      rainfall: 48.0,
      windSpeed: 41,
      windDirection: 'W',
      pressure: 1000,
      riskLevel: 'HIGH',
      riskScore: 81,
      predictedRisk: 'HIGH',
      predictionConfidence: '82% (SIMULATION)',
      expectedTime: 'Next 30 minutes',
      recommendedAction: {
        en: 'Flash flood alert for local stream beds. Do not cross flooded bridges.',
        mr: 'स्थानिक ओढ्यांसाठी फ्लॅश फ्लड अलर्ट. पाण्याखालील पूल ओलांडू नका.',
        hi: 'स्थानीय नदी-नालों के लिए अचानक बाढ़ का अलर्ट। पुलिया पार न करें।'
      }
    },
    kannad: {
      temp: 23.5,
      humidity: 93,
      rainfall: 65.0,
      windSpeed: 48,
      windDirection: 'WNW',
      pressure: 998,
      riskLevel: 'HIGH',
      riskScore: 88,
      predictedRisk: 'EXTREME',
      predictionConfidence: '81% (SIMULATION)',
      expectedTime: 'Immediate',
      recommendedAction: {
        en: 'Landslide warning on Kannad Ghat section. Heavy vehicle transit suspended.',
        mr: 'कन्नड घाटात दरड कोसळण्याचा इशारा. जड वाहतूक बंद.',
        hi: 'कन्नड़ घाट पर भूस्खलन की चेतावनी। भारी वाहनों की आवाजाही रोकी गई।'
      }
    },
    shendra: {
      temp: 25.9,
      humidity: 83,
      rainfall: 32.0,
      windSpeed: 29,
      windDirection: 'SW',
      pressure: 1003,
      riskLevel: 'MODERATE',
      riskScore: 59,
      predictedRisk: 'MODERATE',
      predictionConfidence: '88% (SIMULATION)',
      expectedTime: 'Next 60 minutes',
      recommendedAction: {
        en: 'Automated flood gates active in industrial zone.',
        mr: 'औद्योगिक क्षेत्रातील स्वयंचलित फ्लड गेट्स सक्रिय.',
        hi: 'औद्योगिक क्षेत्र में स्वचालित बाढ़ गेट सक्रिय।'
      }
    }
  },
  SEVERE_WEATHER: {
    waluj: {
      temp: 22.8,
      humidity: 97,
      rainfall: 98.4,
      windSpeed: 62,
      windDirection: 'WSW',
      pressure: 992,
      riskLevel: 'EXTREME',
      riskScore: 96,
      predictedRisk: 'EXTREME',
      predictionConfidence: '88% (SIMULATION)',
      expectedTime: 'IMMEDIATE EMERGENCY',
      recommendedAction: {
        en: 'EMERGENCY: Immediate evacuation of low-lying industrial basements. Seek shelter in concrete structures.',
        mr: 'आणीबाणी: सखल औद्योगिक तळघरांमधून तातडीने बाहेर पडा. पक्क्या इमारतींमध्ये आसरा घ्या.',
        hi: 'आपातकाल: निचले औद्योगिक बेसमेंट को तुरंत खाली करें। पक्के भवनों में शरण लें।'
      }
    },
    cidco: {
      temp: 23.1,
      humidity: 95,
      rainfall: 82.0,
      windSpeed: 54,
      windDirection: 'SW',
      pressure: 994,
      riskLevel: 'EXTREME',
      riskScore: 92,
      predictedRisk: 'EXTREME',
      predictionConfidence: '87% (SIMULATION)',
      expectedTime: 'IMMEDIATE',
      recommendedAction: {
        en: 'Severe urban inundation. Avoid electrical poles, subways, and Jalna Highway.',
        mr: 'गंभीर शहरी पूर. विजेचे खांब, भुयारी मार्ग आणि जालनारस्ता टाळा.',
        hi: 'गंभीर जलभराव। बिजली के खंभों, सबवे और जालना हाईवे से दूर रहें।'
      }
    },
    city_center: {
      temp: 23.5,
      humidity: 94,
      rainfall: 71.0,
      windSpeed: 48,
      windDirection: 'WSW',
      pressure: 995,
      riskLevel: 'HIGH',
      riskScore: 85,
      predictedRisk: 'EXTREME',
      predictionConfidence: '85% (SIMULATION)',
      expectedTime: 'Next 15 minutes',
      recommendedAction: {
        en: 'High alert in central markets. Power supply isolated in flooded streets.',
        mr: 'मध्यवर्ती बाजारपेठांमध्ये हाय अलर्ट. पूरग्रस्त रस्त्यांवर वीजपुरवठा खंडित.',
        hi: 'केंद्रीय बाजारों में हाई अलर्ट। बाढ़ वाले इलाकों में बिजली काटी गई।'
      }
    },
    paithan: {
      temp: 24.0,
      humidity: 92,
      rainfall: 64.0,
      windSpeed: 45,
      windDirection: 'S',
      pressure: 996,
      riskLevel: 'HIGH',
      riskScore: 84,
      predictedRisk: 'EXTREME',
      predictionConfidence: '86% (SIMULATION)',
      expectedTime: 'Next 30 minutes',
      recommendedAction: {
        en: 'Jayakwadi spillway warning! Riverbank residents move to high ground immediately.',
        mr: 'जायकवाडी धरणाचा इशारा! नदीकाठच्या नागरिकांनी ताबडतोब उंच ठिकाणी जावे.',
        hi: 'जायकवाड़ी बांध चेतावनी! नदी तट के निवासी तुरंत ऊंचे स्थानों पर जाएं।'
      }
    },
    vaijapur: {
      temp: 22.5,
      humidity: 98,
      rainfall: 88.5,
      windSpeed: 58,
      windDirection: 'W',
      pressure: 993,
      riskLevel: 'EXTREME',
      riskScore: 94,
      predictedRisk: 'EXTREME',
      predictionConfidence: '84% (SIMULATION)',
      expectedTime: 'IMMEDIATE',
      recommendedAction: {
        en: 'Cloudburst threshold exceeded. Rural emergency teams deployed.',
        mr: 'ढगफुटीची मर्यादा ओलांडली. ग्रामीण आपत्कालीन पथके तैनात.',
        hi: 'बादल फटने की सीमा पार हुई। ग्रामीण आपातकालीन टीमें तैनात।'
      }
    },
    kannad: {
      temp: 21.8,
      humidity: 99,
      rainfall: 112.0,
      windSpeed: 70,
      windDirection: 'WNW',
      pressure: 990,
      riskLevel: 'EXTREME',
      riskScore: 98,
      predictedRisk: 'EXTREME',
      predictionConfidence: '89% (SIMULATION)',
      expectedTime: 'IMMEDIATE',
      recommendedAction: {
        en: 'CRITICAL: Severe mudslide in progress. Kannad Ghat completely closed.',
        mr: 'गंभीर: भूस्खलन सुरू आहे. कन्नड घाट पूर्णपणे बंद करण्यात आला आहे.',
        hi: 'गंभीर: भूस्खलन जारी। कन्नड़ घाट पूरी तरह से बंद।'
      }
    },
    shendra: {
      temp: 23.8,
      humidity: 93,
      rainfall: 68.0,
      windSpeed: 46,
      windDirection: 'SW',
      pressure: 995,
      riskLevel: 'HIGH',
      riskScore: 82,
      predictedRisk: 'HIGH',
      predictionConfidence: '86% (SIMULATION)',
      expectedTime: 'Next 30 minutes',
      recommendedAction: {
        en: 'Emergency power backup triggered for critical infrastructure.',
        mr: 'महत्त्वाच्या पायाभूत सुविधांसाठी आपत्कालीन वीज बॅकअप सुरू.',
        hi: 'महत्वपूर्ण बुनियादी ढांचे के लिए आपातकालीन बिजली बैकअप चालू।'
      }
    }
  }
};

// 90-Minute Nowcasting prediction timeline data for Recharts chart
export const NOWCASTING_TIMELINE_DATA = {
  NORMAL: [
    { time: 'NOW', rainfall: 0.2, wind: 12, riskScore: 18, cloudCover: 20, lightningProb: 2 },
    { time: '+15 MIN', rainfall: 0.5, wind: 13, riskScore: 20, cloudCover: 25, lightningProb: 3 },
    { time: '+30 MIN', rainfall: 0.8, wind: 14, riskScore: 22, cloudCover: 28, lightningProb: 4 },
    { time: '+45 MIN', rainfall: 1.2, wind: 13, riskScore: 24, cloudCover: 30, lightningProb: 5 },
    { time: '+60 MIN', rainfall: 0.6, wind: 11, riskScore: 21, cloudCover: 22, lightningProb: 3 },
    { time: '+90 MIN', rainfall: 0.1, wind: 10, riskScore: 19, cloudCover: 18, lightningProb: 1 }
  ],
  MODERATE_RAIN: [
    { time: 'NOW', rainfall: 8.5, wind: 18, riskScore: 32, cloudCover: 65, lightningProb: 15 },
    { time: '+15 MIN', rainfall: 14.2, wind: 21, riskScore: 44, cloudCover: 75, lightningProb: 28 },
    { time: '+30 MIN', rainfall: 18.5, wind: 24, riskScore: 52, cloudCover: 82, lightningProb: 40 },
    { time: '+45 MIN', rainfall: 22.0, wind: 26, riskScore: 60, cloudCover: 88, lightningProb: 45 },
    { time: '+60 MIN', rainfall: 16.8, wind: 22, riskScore: 55, cloudCover: 78, lightningProb: 32 },
    { time: '+90 MIN', rainfall: 9.0, wind: 17, riskScore: 42, cloudCover: 60, lightningProb: 20 }
  ],
  HEAVY_RAIN: [
    { time: 'NOW', rainfall: 28.0, wind: 28, riskScore: 52, cloudCover: 85, lightningProb: 60 },
    { time: '+15 MIN', rainfall: 39.5, wind: 33, riskScore: 71, cloudCover: 92, lightningProb: 75 },
    { time: '+30 MIN', rainfall: 52.0, wind: 38, riskScore: 86, cloudCover: 98, lightningProb: 88 },
    { time: '+45 MIN', rainfall: 58.4, wind: 42, riskScore: 90, cloudCover: 100, lightningProb: 92 },
    { time: '+60 MIN', rainfall: 46.0, wind: 36, riskScore: 82, cloudCover: 94, lightningProb: 80 },
    { time: '+90 MIN', rainfall: 31.2, wind: 29, riskScore: 70, cloudCover: 86, lightningProb: 65 }
  ],
  SEVERE_WEATHER: [
    { time: 'NOW', rainfall: 45.0, wind: 42, riskScore: 75, cloudCover: 95, lightningProb: 82 },
    { time: '+15 MIN', rainfall: 72.0, wind: 52, riskScore: 88, cloudCover: 100, lightningProb: 94 },
    { time: '+30 MIN', rainfall: 98.4, wind: 62, riskScore: 96, cloudCover: 100, lightningProb: 99 },
    { time: '+45 MIN', rainfall: 108.0, wind: 68, riskScore: 98, cloudCover: 100, lightningProb: 99 },
    { time: '+60 MIN', rainfall: 89.5, wind: 59, riskScore: 93, cloudCover: 98, lightningProb: 92 },
    { time: '+90 MIN', rainfall: 62.0, wind: 48, riskScore: 84, cloudCover: 90, lightningProb: 80 }
  ]
};

// AI Engine Factors breakdown for visual processing panel
export const AI_RISK_FACTORS = {
  NORMAL: [
    { name: 'Rainfall Rate', value: '0.2 mm/hr', weight: 'Low Impact', status: 'Normal', score: 10 },
    { name: 'Atmospheric Humidity', value: '48%', weight: 'Moderate', status: 'Normal', score: 20 },
    { name: 'Wind Velocity & Shear', value: '12 km/h', weight: 'Low', status: 'Stable', score: 15 },
    { name: 'Surface Temperature', value: '31.2 °C', weight: 'Thermal Stability', status: 'Optimal', score: 15 },
    { name: 'Historical Pattern Match', value: '94% Dry Cell Match', weight: 'High Confidence', status: 'Baseline', score: 12 },
    { name: 'Topographic Catchment Index', value: 'Low Drainage Pressure', weight: 'Fixed Feature', status: 'Safe', score: 25 },
    { name: 'Cell Velocity & Trend', value: '+0.1 mm/15min', weight: 'Predictive', status: 'Flat', score: 10 }
  ],
  MODERATE_RAIN: [
    { name: 'Rainfall Rate', value: '18.5 mm/hr', weight: 'High Impact', status: 'Escalating', score: 55 },
    { name: 'Atmospheric Humidity', value: '74%', weight: 'Convective Index', status: 'Moist', score: 60 },
    { name: 'Wind Velocity & Shear', value: '24 km/h', weight: 'Turbulence', status: 'Moderate', score: 45 },
    { name: 'Surface Temperature', value: '27.5 °C', weight: 'Thermal Drop', status: 'Cooling', score: 40 },
    { name: 'Historical Pattern Match', value: '88% Summer Shower Match', weight: 'High Confidence', status: 'Correlated', score: 50 },
    { name: 'Topographic Catchment Index', value: 'Moderate Ponding Vulnerability', weight: 'Fixed Feature', status: 'Monitored', score: 52 },
    { name: 'Cell Velocity & Trend', value: '+4.5 mm/15min', weight: 'Predictive Vector', status: 'Rising', score: 58 }
  ],
  HEAVY_RAIN: [
    { name: 'Rainfall Rate', value: '52.0 mm/hr', weight: 'Critical Impact', status: 'Severe Peak', score: 88 },
    { name: 'Atmospheric Humidity', value: '89%', weight: 'Saturation Peak', status: 'Near Saturated', score: 85 },
    { name: 'Wind Velocity & Shear', value: '38 km/h', weight: 'Gust Front', status: 'Turbulent', score: 82 },
    { name: 'Surface Temperature', value: '25.1 °C', weight: 'Cold Downdraft', status: 'Inversion', score: 78 },
    { name: 'Historical Pattern Match', value: '91% Urban Flood Match', weight: 'Neural Confidence', status: 'High Vulnerability', score: 89 },
    { name: 'Topographic Catchment Index', value: 'Waluj Low Underpass Inundation', weight: 'Critical Zone', status: 'Overflow Warning', score: 92 },
    { name: 'Cell Velocity & Trend', value: '+12.5 mm/15min', weight: 'Surge Acceleration', status: 'Rapid Surge', score: 90 }
  ],
  SEVERE_WEATHER: [
    { name: 'Rainfall Rate', value: '98.4 mm/hr', weight: 'Extreme Cloudburst', status: 'Catastrophic', score: 99 },
    { name: 'Atmospheric Humidity', value: '97%', weight: 'Super-Saturated', status: 'Total Saturation', score: 96 },
    { name: 'Wind Velocity & Shear', value: '62 km/h', weight: 'Gale Shear', status: 'Severe Squall', score: 94 },
    { name: 'Surface Temperature', value: '22.8 °C', weight: 'Deep Convective Core', status: 'Extreme Cold Top', score: 90 },
    { name: 'Historical Pattern Match', value: '96% Flash Flood Breach Match', weight: 'Max Confidence', status: 'Critical Match', score: 97 },
    { name: 'Topographic Catchment Index', value: 'Catastrophic Basin Runoff', weight: 'Max Elevation Risk', status: 'Breach Level', score: 98 },
    { name: 'Cell Velocity & Trend', value: '+26.4 mm/15min', weight: 'Cloudburst Core', status: 'Extreme Burst', score: 98 }
  ]
};
