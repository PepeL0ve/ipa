Windows (.exe) и iPhone (.ipa) через GitHub Actions.
1) Залейте ВСЁ содержимое этой папки в новый репозиторий GitHub.
2) Settings -> Secrets and variables -> Actions -> Variables: GRAM_API = https://ваш-адрес ; GRAM_PIN = PIN из setup.sh (или пусто для домена).
3) Actions -> «Собрать приложения» -> Run workflow. Готовые файлы: Artifacts.
iPhone: IPA неподписанный (AltStore/Sideloadly/TrollStore); нужен домен с обычным сертификатом.
Windows: если PIN задан, приложение доверяет только вашему сертификату.
