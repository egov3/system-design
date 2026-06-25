const createLangDic = (ru: string, kk: string, en: string) => ({ en, kk, ru });

export const QualityFeedback = {
  reasonTitle: createLangDic(
    "Укажите, пожалуйста, причину низкой оценки",
    "Төмен бағаның себебін көрсетіңіз",
    "Please specify the reason for the low rating",
  ),
  reasonDescription: createLangDic(
    "Ваш отзыв очень важен для нас.\nОпишите проблему как можно подробнее.",
    "Сіздің пікіріңіз біз үшін өте маңызды.\nМәселені мүмкіндігінше толық сипаттаңыз.",
    "Your feedback is very important to us.\nDescribe the issue in as much detail as possible.",
  ),
  reasonPlaceholder: createLangDic(
    "Напишите отзыв",
    "Пікір жазыңыз",
    "Write feedback",
  ),
  submit: createLangDic("Отправить", "Жіберу", "Send"),
  cancel: createLangDic("Отменить", "Болдырмау", "Cancel"),
  title: createLangDic(
    "Оцените качество поиска!",
    "Іздеу сапасын бағалаңыз!",
    "Rate search quality!",
  ),
  subtitle: createLangDic(
    "Просим честно оценить результат",
    "Нәтижені әділ бағалауыңызды сұраймыз",
    "Please rate the result honestly",
  ),
  submitRating: createLangDic("Отправить оценку", "Баға жіберу", "Send rating"),
  ratingLabels: {
    angry: createLangDic("Очень плохо", "Өте нашар", "Very bad"),
    frowning: createLangDic("Плохо", "Нашар", "Bad"),
    neutral: createLangDic("Нормально", "Қалыпты", "Neutral"),
    smile: createLangDic("Хорошо", "Жақсы", "Good"),
    smileFace: createLangDic("Отлично", "Өте жақсы", "Excellent"),
  },
  ratingTooltipLabels: {
    angry: createLangDic("Очень плохо!", "Өте нашар!", "Very bad!"),
    frowning: createLangDic("Не нравится", "Ұнамайды", "Do not like"),
    neutral: createLangDic("Нормально", "Қалыпты", "Neutral"),
    smile: createLangDic("Устраивает", "Қанағаттанарлық", "Good enough"),
    smileFace: createLangDic("Отлично!", "Өте жақсы!", "Excellent!"),
  },
};
