declare i=1;
for f in ./public/images/cards/loteria-*\.png; 
    do mv "$f" "$(echo "$f" | sed s/"loteria-"/"card_"/)"; 
    i=$((i++));
done
