# BasicCRM
Bu bəsit bir CRM veb applikasiyasıdı.

# Necə çalışır ?
Əvvəla databaza ilə konfiqurasiya həll edilməlidir(.env faylında) və cari alətin ip addressi əlavə 
edilməlidir ("https://cloud.mongodb.com/", network access). 

Visual hissəsi üçün isə sadəcə "npm install" əmrini çalışdırın.

# Hansı texnologiyalar istifadə olunub ? 
Göndərdiyiniz taskı "MEAN Stack" mühitində yazdım. Məlumatlar "MongoDB"-də saxlanılır. Node.js vasitəsilə APİ şəklində məlumatlar db-a yazılır və oradan çəkilir. Authorizasiya məsələləri jwt token ilə həll edilib. Vizual hissəsi isə Angular ilə yazılıb.

# İşin Məzmunu
Qısacası Başlanğıc nöqtəsi login pəncərəsidir. Əgər qeydiyyat yoxdursa "Register" pəncərəsinə keçmək olur. Qeydiyyatsız ziyarətçi bunun xaricində başqa bir pəncərəyə keçə bilməz. Burada ilk qeydiyyat "admin", digərləri isə "member" şəklində yadda saxlanılır. "Log in" əməliyyatından sonra əsas pəncərəyə keçmək mümkün olur. Bütün qeydiyyatlı istifadəçilər məlumatları görə bilir(bütün müştərilərə baxış, müştərinin detaylı baxışı, xoş gəldiniz pəncərəsi). Lakin sadəcə admin müştəriləri silə və ya əlavə edə bilər.