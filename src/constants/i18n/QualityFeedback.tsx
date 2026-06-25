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
};
