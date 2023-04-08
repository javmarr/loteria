declare i=1;
for f in ./public/images/cards/*copy*\.png; 
    do mv "$f" "$(echo "$f" | sed s/"card_1 copy " "$i /"card_"$i"/)"; 
    i=$((i++));
done
